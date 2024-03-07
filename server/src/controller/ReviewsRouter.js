const express = require('express');
const router = express.Router();
const reviewsService = require('../service/ReviewsService');
const { validationMiddleware } = require('./ReviewsHelper');
const { authenticateToken } = require('../util/WebToken');

// CREATE
// New Review Post
router.post('/', authenticateToken, validationMiddleware, async (req, res) => {
    //either throws an error or returns the review it stores
    try {
        //add username to body through the jwt tokens username
        const data = await reviewsService.createNewReview(req.body);
        res.status(201).json({
            message: 'Created Review Successfully',
            ReviewPost: data
        });
    } catch(err) {
        res.status(500).json({
            message: `Error Trying This Request`,
            error_message: err.message
        })
    }
})

// READ

// UPDATE

// DELETE

module.exports = router;