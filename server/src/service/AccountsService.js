const accountsDao = require('../repository/AccountsDAO');
const { logger } = require('../util/logger');

async function createNewAccount(receivedData) {
    logger.info('createNewAccount function called from AccountsService.js');
    // validate required fields
    if (validateFields(receivedData)) {
        // validate account does not already exist
        const doesExist = await accountDoesExist(receivedData.username);
        if (!doesExist) {
            // encrypt password?
            const data = await accountsDao.createNewAccount({
                username: receivedData.username,
                password: receivedData.password, // encrypt this
                isAdmin: false
            });
            return data;
        }
        // replace with custom error if time permits
        return 'username already exists';
    }
    return null;    
}


async function accountDoesExist(username) {
    const data = await accountsDao.getAccountByUsername(username);

    if (data.Item) {
        // account already exists
        return true;
    } else {
        return false;
    }
}

async function login(username, password) {
    logger.info('login function called from AccountsService.js');
    const data = await accountsDao.getAccountByUsername(username);

    if (data.Item && password === data.Item.password) {
        return data
    } else {
        return null;
    }
}

function validateFields(data) {
    if (!data.username || !data.password) {
        return false;
    } else if (containsSpecialCharacters(data.username)) {
        return false;
    } else {
        return true;
    }
}

// will return false if input only contains whitelisted characters
function containsSpecialCharacters(string) {
    const validChars = 'abcdefghijklmnopqrstuvwxyz1234567890-_';
    let isInvalid = false;

    for (char of string) {
        if (!validChars.includes(char)) {
            isInvalid = true;
            break;
        }
    }

    return isInvalid;
}


module.exports = {
    createNewAccount,
    accountDoesExist,
    login,
    validateFields,
    containsSpecialCharacters
}
