const uuid = require('uuid');
const { logger } = require('../util/logger');
const commentsDao = require('../repository/CommentsDAO');

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


module.exports = {
    createNewComment,
    getCommentsByReviewId
}