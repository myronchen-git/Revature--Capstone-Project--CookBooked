const reviewsDao = require('../repository/ReviewsDAO');
const uuid = require('uuid');
const { logger } = require('../util/logger');

async function createNewReview(receivedData) {
    logger.info('CreateNewReview method called');
    //validate data before posting a new review
    try {
        validateFields(receivedData);
        logger.info('Creating new review');
        //create new review
        const review = {
            recipeId: uuid.v4(),
            reviewId: uuid.v4(),
            author: receivedData.username,
            imageUrl: receivedData.imageUrl,
            rating: receivedData.rating,
            content: receivedData.content,
            createdAt: Date.now()
        }

        //create the new post
        const data = await reviewsDao.postReview(review);
        //return the review object to show back
        if(data) {
            return review;
        }
    } catch(err) {
        logger.error(err);
        throw Error(err.message);
    }
}


function validateFields(data) {
    logger.info('Calling validateFields method');
    //validate username is presented when request is sent (should be sent through JWT so it is either empty or there)
    if (!data.username) {
        throw new Error('No Username Present');
    } 
    //else if no image present
    else if(!data.imageUrl) {
        throw new Error('No Image Present');
    }
    //else if no rating present
    else if(!data.rating) {
        throw new Error('No Rating Present');
    }
    //else if no content present
    else if(!data.content) {
        throw new Error('No Content Present');
    }
    //else if check if rating is between 0-5 
    else if(!(data.rating >= "1" && data.rating <= "5")) {
        throw new Error('Rating is outside range of 1-5')
    }
    //finally check if any of the images are of extension .png .jpg or .jpeg
    else if(data.imageUrl.endsWith('.png') || data.imageUrl.endsWith('.jpg') || data.imageUrl.endsWith('.jpeg')) {
        logger.info('Validated all fields');
        return true;
    } else {
        throw new Error('Image Extension Unapplicable');
    }
}


module.exports = {
    createNewReview,
    validateFields
}