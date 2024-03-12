const uuid = require('uuid');
const { logger } = require('../util/logger');
const commentsDao = require('../repository/CommentsDAO');
const ArgumentError = require("../errors/ArgumentError");

/**
 * This function is used to connect to the DAO in order to post a new comment
 * 
 * @param {Object} receivedData Information about the comment to Post
 * @returns The new comment
 */
async function createNewComment(receivedData) {
    logger.info('CreateNewComment method called');
    try {
        //create new comment
        const comment = {
            reviewId: receivedData.reviewId, 
            commentId: uuid.v4(),
            author: receivedData.username, //username acquired from JWT
            content: receivedData.content, //passed in by user
            createdAt: Date.now()
        }
        //create the new post
        const data = await commentsDao.postComment(comment);
        //return the comment object to show back
        return data;
    } catch(err) {
        logger.error(err);
        throw Error(err.message);
    }
}

/**
 * GetCommentsByReviewId will call the DAO function to retrieve the comments under a specific ReviewID
 * 
 * @param {String} reviewId ReviewId to be queried on to retrieve all comments
 * @returns The Items list of Comments returned from the DAO
 */
async function getCommentsByReviewId(reviewId) {
    logger.info(`GetCommentsByReviewID Called With ReviewID: ${reviewId}`);
    //try catch calling the DAO function
    try {
        const data = await commentsDao.getCommentsByReviewId(reviewId);
        //check if the Items are empty, if so indicate by throwing an error
        if(data.length == 0) {
            throw new Error("No Comments Under This Review ID");
        }
        return data;
    } catch(err) {
        throw Error(err.message);
    }
}

/**
 * This function receives the comment to be deleted checks if the user is the one deleting their own post or if
 * they are an Admin, and then will call the DAO to delete that Comment
 * 
 * @param {Object} receivedData data regarding the deletion of the comment
 * @returns the deleted comment
 */
async function deleteComment(receivedData) {
    logger.info("CommentsService.deleteComment called");
    //if there is no reviewId then throw an argument error
    if(!receivedData.reviewId) {
        throw new ArgumentError("Review Id must be defined in Request Body");
    }
    try {
        //next check if the user matches the author of the title or not admin
        const item = await commentsDao.getOneCommentById(receivedData);
        if(!item) {
            throw new Error("No Comment has this ID");
        }
        else if(receivedData.username === item.author || receivedData.isAdmin) {
            //call the delete method from DAO
            //will return the deleted item from the DB or will be caught in try catch
            await commentsDao.deleteCommentById(receivedData);
            return item;
        } else {
            throw new ArgumentError("Cannot Delete Another Users Post");
        }

    } catch(err) {
        throw Error(err);
    }
}


module.exports = {
    createNewComment,
    getCommentsByReviewId,
    deleteComment
}