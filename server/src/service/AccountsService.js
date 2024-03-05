const accountsDao = require('../repository/AccountsDAO');

async function createNewAccount(receivedData) {
    // validate required fields
    if (validateFields(receivedData)) {
        // validate account does not already exist
        const doesExist = await accountDoesExist(receivedData.username);
        if (!doesExist) {
            // encrypt password?
            const data = await accountsDao.createNewAccount({
                username: receivedData.username,
                password: receivedData.password, // encrypt this
                isAdmin: receivedData.isAdmin,
                
            })
        }
    }

    
}


async function accountDoesExist(username) {
    const data = await accountsDao.getAccountByUsername(username);

    if (data.Items.length > 0) {
        // account already exists
        return true;
    } else {
        return false;
    }
}


function validateFields(data) {
    if (!data.username || !data.password || typeofdata.isAdmin != 'boolean') {
        return false;
    } else {
        return true;
    }
}


module.exports = {
    createNewAccount
}
