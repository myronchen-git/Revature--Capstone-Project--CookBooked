const { logger } = require("../util/logger");
const { URL } = require('url');


// HELPERS
// Input req.body, return an object after cleaning
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
