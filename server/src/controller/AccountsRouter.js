const express = require('express');
const router = express.Router();
const accountsService = require('../service/AccountsService');
const accountsHelpers = require('./AccountsHelper');
const {generateToken, authenticateToken} = require('../util/WebToken');

// CREATE
// New User Registration
// Request body should contain username, password, and isAdmin
router.post('/', async (req, res) => {
    try {
        let body = accountsHelpers.cleanUsernamePassword(req.body);
        const data = body != null ? await accountsService.createNewAccount(body) : null; //

        res.status(201).json({message: 'Account created successfully', data});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

router.post('/auth', async (req, res) => {
    try {
        const body = accountsHelpers.cleanUsernamePassword(req.body);
        const {username, password} = body;
        const data = await accountsService.login(username, password);
        const token = generateToken(data.Item);
        res.status(201).json({username: data.Item.username, token});

    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// READ
// Retrieve profile information by username
router.get('/', async (req, res) => {
    try {
        const data = await accountsService.getProfileInfo(req.body);
        res.status(200).json({aboutMe: data.aboutMe, imageUrl: data.imageUrl})
    } catch (err) {
        res.status(400).json({message: err.message});
    }

})

// UPDATE
// Update admin privileges (must be admin to access this feature)
router.put('/admin', authenticateToken, async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const username = req.body.username;
            const data = await accountsService.toggleAdmin(username);

            res.status(200).json({message: `Successfully updated admin priveleges for user: ${username}`});
        } else {
            res.status(403).json({message: 'You must have admin priveleges to access this feature'});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Update own user profile information
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        if (req.body.aboutMe || req.body.imageUrl) {
            const username = req.user.username;
            const data = await accountsService.updateProfile(username, req.body);

            res.status(200).json({message: 'Successfully updated profile information'});
        } else {
            res.status(400).json({message: 'Unable to update profile information, invalid input data'});
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// DELETE



module.exports = router;
