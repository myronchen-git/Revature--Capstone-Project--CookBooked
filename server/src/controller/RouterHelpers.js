// HELPERS
// Input req.body, return an object after cleaning
function cleanUsernamePassword(body) {

    let username = body.username ? body.username.toLowerCase().trim() : undefined;
    
    let password = body.password ? body.password.trim() : undefined;

    let cleanedBody = {
        username,
        password
    };

    // if body.isAdmin exists and it is boolean, do not make changes
    // else if body.isAdmin exists and is not boolean, set to undefined
    // else (body.isAdmin does not exist), do not add isAdmin field to cleaned body object
    if (body.isAdmin != undefined && typeof body.isAdmin == 'boolean') {
        cleanedBody.isAdmin = body.isAdmin;
    } else if (body.isAdmin != undefined && typeof body.isAdmin != 'boolean') {
        cleanedBody.isAdmin = undefined;
    }

    return cleanedBody;
}

module.exports = {
    cleanUsernamePassword
}
