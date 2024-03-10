const { logger } = require("../util/logger");
const { URL } = require('url');


/**
 * cleanUsernamePassword will take request body as input and return it after trimming whitespace and converting input username to lowercase
 * 
 * @param {Object} body that contains request body to be cleaned
 * @returns an object with cleaned username and password if they exist in body, otherwise null
 */
function cleanUsernamePassword(body) {

    if (typeof body.username == 'string' && typeof body.password == 'string') {
        let username = body.username ? body.username.toLowerCase().trim() : undefined;
    
        let password = body.password ? body.password.trim() : undefined;

        let cleanedBody = {
        username,
        password
        };

        return cleanedBody;
    } else {
        return null;
    }
}

module.exports = {
    cleanUsernamePassword
}
