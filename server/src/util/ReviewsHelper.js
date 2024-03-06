const { logger } = require("./logger");


function validateNewReview(submittedReview) {
    logger.info(`validateNewReview(${JSON.stringify(submittedReview)})`);

    let { recipeId, username, imageUrl, rating, content } = submittedReview;

    //sanitize the following inputs to make sure they are of right format
    imageUrl = sanitizeImage(imageUrl);
    rating = sanitizeRating(rating);
    
    //check if all values are correct
    if(recipeId && username && imageUrl && rating && content) {
        const validatedReview = { recipeId, username, imageUrl, rating, content };
        logger.info(`Validated Review ${JSON.stringify(validatedReview)}`);
        return validatedReview;
    } else {
        logger.error(`Invalid request body parameters in ${JSON.stringify(submittedReview)}`);
        throw new Error("Invalid request to the server");
    }
}

// -------------------------------------
// Sanitize functions to clean input data
// -------------------------------------

/**
 * Makes sure the image that was requested is of extension .png .jpg or .jpeg
 * 
 * @param imageUrl 
 * @returns the image back or throws an error
 */
function sanitizeImage(imageUrl) {
    //throws an error if the image is invalid extension
    if(imageUrl.endsWith('.png') || imageUrl.endsWith('.jpg') || imageUrl.endsWith('.jpeg')) {
        logger.info('Valid Image Extension');
        return imageUrl;
    } else {
        throw new Error('Please Enter a Valid Image');
    }
}

/**
 * Sanitize the rating so that it returns a rating between 1-5
 * 
 * @param rating 
 * @returns the rating back or throws an error
 */
function sanitizeRating(rating) {
    if(!(data.rating >= "1" && data.rating <= "5")) {
        throw new Error('Rating is outside range of 1-5')
    } else {
        return rating;
    }
}

module.exports = {
    validateNewReview
}