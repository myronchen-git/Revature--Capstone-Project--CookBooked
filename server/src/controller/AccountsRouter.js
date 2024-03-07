const express = require('express');
const router = express.Router();
const accountsService = require('../service/AccountsService');
const accountsHelpers = require('./AccountsHelper');
const webToken = require('../util/WebToken');

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
        const token = webToken.generateToken(data.Item);
        res.status(201).json({message: 'Login successful', token});
    } else {
        res.status(400).json({message: 'Invalid login credentials'});
    }
})

// READ

// UPDATE

// DELETE



module.exports = router;
