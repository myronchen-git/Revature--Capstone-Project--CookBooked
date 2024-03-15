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
// Delete an Individual Comment
router.delete("/review/:reviewId/comments/:commentId", authenticateToken, async (req, res) => {
    try {
        //create a body that combines the reviewId with the commentId (add username and isAdmin as well)
        const body = {};
        body.reviewId = req.params.reviewId;
        body.commentId = req.params.commentId;
        body.username = req.user.username;
        body.isAdmin = req.user.isAdmin;
        const data = await commentsService.deleteComment(body);
        res.status(200).json({
            message: "Deleted Comment Successfully",
            ReviewPost: data,
          });
    } catch(err) {
        res.status(500).json({
            message: `Error Trying This Request`,
            error_message: err.message,
          });
    }
})

module.exports = router;