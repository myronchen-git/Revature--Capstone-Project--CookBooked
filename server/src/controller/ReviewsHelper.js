const { logger } = require("../util/logger");
const { URL } = require('url');


function validateNewReview(submittedReview) {
    logger.info(`validateNewReview(${JSON.stringify(submittedReview)})`);

    let { recipeId, username, imageUrl, rating, content } = submittedReview;

    //sanitize the following inputs to make sure they are of right format
    imageUrl = sanitizeImage(imageUrl);
    rating = sanitizeRating(rating);
    content = isString(content);
    recipeId = isString(recipeId);
    
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
    if(isImage(imageUrl)) {
        logger.info('Valid Image Extension');
        return imageUrl;
    } else {
        throw new Error('Please Enter a Valid Image');
    }
}

/**
 * Function to validate an image url
 */
function isImage(url) {
    //extract the url using the URL module (check for valid URL)
    const receivedUrl = new URL(url);
    //check if it ends with .png, .jpg, .jpeg (Can constrain to these since they are the most common images extensions)
    if(receivedUrl.pathname.endsWith('.png') || receivedUrl.pathname.endsWith('.jpg') || receivedUrl.pathname.endsWith('.jpeg')) {
        return true;
    } else {
        return false;
    }
}

/**
 * Sanitize the rating so that it returns a rating between 1-5
 * 
 * @param rating 
 * @returns the rating back or throws an error
 */
function sanitizeRating(rating) {
    //check if the rating is a Integer
    if(Number.isInteger(rating)) {
        if(!(rating >= 1 && rating <= 5)) {
            throw new Error('Rating is outside range of 1-5');
        } else {
            return rating;
        }
    } else {
        throw new Error('Rating is not a number');
    }
}

/**
 * Check if content is of type string
 */
function isString(str) {
    if(typeof str === 'string') {
        return str;
    } else {
        throw new Error(`${str} must be of type String`);
    }
}

module.exports = {
    validateNewReview,
    sanitizeImage,
    sanitizeRating,
    isImage,
    isString
}