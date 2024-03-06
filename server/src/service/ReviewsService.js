const reviewsDao = require('../repository/ReviewsDAO');
const uuid = require('uuid');
const { logger } = require('../util/logger');

async function createNewReview(receivedData) {
    logger.info('CreateNewReview method called');
    //validate data before posting a new review
    try {
        //create new review
        const review = {
            recipeId: receivedData.recipeId, //recipeId passed from MealDB API
            reviewId: uuid.v4(),
            author: receivedData.username, //username acquired from JWT
            imageUrl: receivedData.imageUrl, //passed in by user
            rating: receivedData.rating, //passed in by user
            content: receivedData.content, //passed in by user
            createdAt: Date.now()
        }
        //create the new post
        const data = await reviewsDao.postReview(review);
        console.log(data);
        //return the review object to show back
        return data;
    } catch(err) {
        logger.error(err);
        throw Error(err.message);
    }
}


module.exports = {
    createNewReview
}