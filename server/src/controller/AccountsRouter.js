const express = require('express');
const router = express.Router();
const accountsService = require('../service/AccountsService');
const accountsHelpers = require('./AccountsHelper');
const {generateToken, authenticateToken} = require('../util/WebToken');

// CREATE
// New User Registration
// Request body should contain username, password, and isAdmin
router.post('/register', async (req, res) => {
    let body = accountsHelpers.cleanUsernamePassword(req.body);
    const data = await accountsService.createNewAccount(body);

    if (data == 'username already exists') {
        res.status(400).json({message: 'An account with this username already exists'});
    } else if (data) {
        res.status(201).json({message: 'Account created successfully'}); // return token?
    } else {
        res.status(400).json({message: 'Account registration failed, required fields missing or contain special characters'});
    }
})

// User Login
router.post('/login', async (req, res) => {
    const body = accountsHelpers.cleanUsernamePassword(req.body);
    const {username, password} = body;
    const data = await accountsService.login(username, password);

    if (data) {
        const token = generateToken(data.Item);
        res.status(201).json({message: 'Login successful', token});
    } else {
        res.status(400).json({message: 'Invalid login credentials'});
    }
})

// READ

// UPDATE
router.put('/admin', authenticateToken, async (req, res) => {
    if (req.user.isAdmin == true) {
        const username = req.body.username;
        const data = await accountsService.toggleAdmin(username);

        if (data) {
            res.status(200).json({message: `Successfully updated admin priveleges for user: ${username}`});
        } else {
            res.status(400).json({message: `Failed to update admin priveleges for user: ${username}`});
        }
    } else {
        res.status(403).json({message: 'You must have admin priveleges to access this feature'});
    }
})

// DELETE



module.exports = router;
