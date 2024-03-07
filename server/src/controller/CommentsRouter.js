const express = require('express');
const router = express.Router();
const commentsService = require('../service/CommentsService');
const { validateNewComment } = require('./CommentsHelper')
const { authenticateToken } = require('../util/WebToken');

// CREATE
// New Comment Post
router.post('/', validationMiddleware, async (req, res) => {
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


// Validation Middleware
function validationMiddleware(req, res, next) {
    try {
        if(req.path === '/') {
            if(req.method === 'POST') {
                //req.body.username = req.user.username;
                //validate the data from the req.body is valid
                req.body = validateNewComment(req.body);
            }
        }

        next();
    } catch(err) {
        res.json({message: err.message});
    }
}

module.exports = router;