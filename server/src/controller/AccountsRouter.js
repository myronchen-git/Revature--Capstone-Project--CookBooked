const express = require('express');
const router = express.Router();
const accountsService = require('../service/AccountsService');

// CREATE
// New User Registration
// Request body should contain username, password, and isAdmin
router.post('/register', async (req, res) => {
    const data = await accountsService.createNewAccount(req.body);

    if (data == 'username already exists') {
        res.status(400).json({message: 'An account with this username already exists'});
    } else if (data) {
        res.status(201).json({message: 'Account created successfully'}); // return token?
    } else {
        res.status(400).json({message: 'Account registration failed, missing one or more required fields'});
    }
})

// READ

// UPDATE

// DELETE


module.exports = router;
