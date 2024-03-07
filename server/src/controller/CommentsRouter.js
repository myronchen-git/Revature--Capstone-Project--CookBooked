const express = require('express');
const router = express.Router();
const commentsService = require('../service/CommentsService');
const { validationMiddleware } = require('./CommentsHelper')
const { authenticateToken } = require('../util/WebToken');

// CREATE
// New Comment Post
//will add authorization check
router.post('/', authenticateToken, validationMiddleware, async (req, res) => {
    //either throws an error or returns the comment it stores
    try {
        //add username to body through the jwt tokens username
        const data = await commentsService.createNewComment(req.body);
        res.status(201).json({
            message: 'Created Comment Successfully',
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