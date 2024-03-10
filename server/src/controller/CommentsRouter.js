const express = require('express');
const router = express.Router();
const commentsService = require('../service/CommentsService');
const { validationMiddleware } = require('./CommentsHelper')
const { authenticateToken } = require('../util/WebToken');

// CREATE
// New Comment Post
router.post("/", authenticateToken, validationMiddleware, async (req, res) => {
    //either throws an error or returns the comment it stores
    try {
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
// Get all Comments by Review ID
router.get("/review/:reviewId/comments", async (req,res) => {
    try {
        const data = await commentsService.getCommentsByReviewId(req.params.reviewId);
        res.status(200).json({
            message: 'Retrieved Comments By ReviewID',
            ReviewPost: data
        });
    } catch(err) {
        res.status(500).json({
            message: `Error Trying This Request`,
            error_message: err.message
        })
    }
})

// UPDATE

// DELETE

module.exports = router;