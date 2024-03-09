const accountsDao = require('../repository/AccountsDAO');
const { logger } = require('../util/logger');
const encryption = require('../util/encryption');

async function createNewAccount(receivedData) {
    logger.info(`createNewAccount function called from AccountsService.js with param receivedData: ${JSON.stringify(receivedData)}`);
    if (!containsSpecialCharacters(receivedData.username)) {
        const doesExist = await accountDoesExist(receivedData.username);
        if (!doesExist) {
            const hash = await encryption.encryptPassword(receivedData.password);
            const data = await accountsDao.createNewAccount({
                username: receivedData.username,
                password: hash,
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
        return true;
    } else {
        return false;
    }
}

async function login(username, password) {
    logger.info(`login function called from AccountsService.js with params username: ${username}, password: ${password}`);
    const data = await accountsDao.getAccountByUsername(username);

    if (data.Item) {
        if (await encryption.validatePassword(password, data.Item.password)) {
            return data
        }
        return null;
    } else {
        return null;
    }
}

async function toggleAdmin(username) {
    logger.info(`toggleAdmin function called from AccountsService.js with param username: ${username}`);
    let isAdmin;
    const user = await accountsDao.getAccountByUsername(username);
    if (user.Item) {
        isAdmin = user.Item.isAdmin;
    } else {
        // account does not exist, return null
        return null;
    }

    try {
        const data = await accountsDao.toggleAdmin(username, isAdmin);
        return data;
    } catch (err) {
        logger.error(err);
        throw Error(err.message);
    }
}

// parse req body and call appropriate dao functions to update aboutMe, imageUrl, or both
// returns an array containing data from dao
async function updateProfile(username, body) {
    logger.info(`updateProfile function called from AccountsService.js with params username: ${username}, body: ${body}`);
    let data = [];

    if (body.aboutMe) {
        try {
            const aboutMeData = await accountsDao.updateProfile(username, attributeName = 'aboutMe', body.aboutMe);
            data.push(aboutMeData);
        } catch (err) {
            logger.error(err);
            throw Error(err.message);
        }
    }

    if (body.imageUrl) {
        try {
            const imageUrlData = await accountsDao.updateProfile(username, attributeName = 'imageUrl', body.imageUrl);
            data.push(imageUrlData);
        } catch (err) {
            logger.error(err);
            throw Error(err.message);
        }
    }

    return (data.length > 0) ? data : null;
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
    containsSpecialCharacters,
    toggleAdmin,
    updateProfile
}
