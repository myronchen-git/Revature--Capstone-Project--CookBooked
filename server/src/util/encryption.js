const bcrypt = require('bcrypt');
const saltRounds = 10;


async function encryptPassword(password) {
    const encrypted = await bcrypt.hash(password, saltRounds);
    return encrypted;
}


async function validatePassword(plaintextPassword, hash) {
    return bcrypt.compare(plaintextPassword, hash);
}



module.exports = {
    encryptPassword,
    validatePassword
}
