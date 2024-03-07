const uuid = require('uuid');
const { logger } = require('../util/logger');
const commentsDao = require('../repository/CommentsDAO');

async function createNewComment(receivedData) {
    logger.info('CreateNewComment method called');
    //validate data before posting a new comment
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


module.exports = {
    createNewComment
}