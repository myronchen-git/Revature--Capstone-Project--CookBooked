const accountsDao = require('../repository/AccountsDAO');
const { logger } = require('../util/logger');
const encryption = require('../util/encryption');

/**
 * createNewAccount will check if username contain special characters, then whether or not an account item already exists with input username,
 * then call the DAO function to add a new account item to accounts table
 * 
 * @param {Object} receivedData containing new account username and encrypted password, isAdmin set false by default
 * @returns dynamoDB data if successful, otherwise throws error
 */
async function createNewAccount(receivedData) {
    logger.info(`createNewAccount function called from AccountsService.js with param receivedData: ${JSON.stringify(receivedData)}`);

    try {
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
            throw Error("Username already exists");
        }
        throw Error("Username may not contain special characters");
    } catch (err) {
        throw Error(err.message);
    }
}

/**
 * accountDoesExist will call DAO function to get account by param username
 * 
 * @param {String} username to pass to GetCommand in DAO
 * @returns true if GetCommand returns an item, false if no item is found
 */
async function accountDoesExist(username) {
    const data = await accountsDao.getAccountByUsername(username);

    if (data.Item) {
        return true;
    } else {
        return false;
    }
}

/**
 * login will call DAO function to get account item by username, then compare input password to stored hashed password
 * 
 * @param {String} username 
 * @param {String} password 
 * @returns dynamoDB data on success and password match, else throw error
 */
async function login(username, password) {
    logger.info(`login function called from AccountsService.js with params username: ${username}, password: ${password}`);

    try {
        const data = await accountsDao.getAccountByUsername(username);

        if (data.Item) {
            if (await encryption.validatePassword(password, data.Item.password)) {
                return data;
            }
            throw Error("Invalid password")
        }
        throw Error("No account found with provided username") 
    } catch (err) {
        throw Error(err.message);
    }
}

/**
 * toggleAdmin will call update function in DAO to update isAdmin attribute of specified username
 * 
 * @param {String} username 
 * @returns null if account does not exist, else returns dynamoDB data with updated isAdmin attribute
 */
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


/**
 * updateProfile will call DAO function to update account item with data in the body
 * 
 * @param {String} username passed by req.user.body to identify which account item is being updated
 * @param {Object} body containing either aboutMe, imageUrl, or both
 * @returns an array containing update data from DynamoDB, else throws error
 */
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

    if (data.length > 0) {
        return data;
    } else {
        throw Error('Failed to update profile information');
    }
}

/**
 * containsSpecialCharacters will check string input against whitelist of allowed characters
 * 
 * @param {String} string to be compared against whitelist
 * @returns true if string contains any characters not in whitelist, else false
 */
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
