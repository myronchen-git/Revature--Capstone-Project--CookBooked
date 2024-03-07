const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.resolve('./.env')
dotenv.configDotenv({path: envPath});

const secretKey = process.env.JWT_SECRET_KEY;

function generateToken(user) {
    const token = jwt.sign(
        {
            username: user.username,
            isAdmin: user.isAdmin
        },
        secretKey,
        {
            expiresIn: '60m'
        }
    );
    return token;
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({message: 'You must be logged in to use this feature'});
    } else {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                res.status(403).json({message: 'You do not have permission to access this feature'});
            } else {
                req.user = user;
                next();
            }
        })
    }
}


function isAdmin(token) {
    const decoded = jwt.decode(token);
    return decoded.isAdmin;
}


module.exports = {
    jwt,
    secretKey,
    generateToken,
    authenticateToken,
    isAdmin,
}
