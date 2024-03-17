const { logger } = require("../util/logger");
const { URL } = require('url');


function validateNewReview(submittedReview) {
    logger.info(`validateNewReview(${JSON.stringify(submittedReview)})`);

    let { recipeId, recipeName, username, imageUrl, rating, content } = submittedReview;

    //sanitize the following inputs to make sure they are of right format
    imageUrl = sanitizeImage(imageUrl);
    rating = sanitizeRating(rating);
    content = isString(content);
    recipeId = isString(recipeId);
    recipeName = isString(recipeName);
    
    //check if all values are correct
    if(recipeId && username && imageUrl && rating && content && recipeName) {
        const validatedReview = { recipeId, recipeName, username, imageUrl, rating, content };
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
    logger.log("ReviewsHelper.sanitizeImage() called")
    //throws an error if the image is invalid extension
    try {
        const url = new URL(imageUrl);
        logger.log("Image verified")
        return url.href;
    } catch (error) {
        logger.error("Invalid URL")
        throw new Error("Invalid URL");
    }
}

/**
 * Sanitize the rating so that it returns a rating between 1-5
 * 
 * @param rating 
 * @returns the rating back or throws an error
 */
function sanitizeRating(rating) {
    logger.log("ReviewsHelper.sanitizeRating() called")
    //check if the rating is a Integer
    if(Number.isInteger(rating)) {
        if(!(rating >= 1 && rating <= 5)) {
            logger.error("Rating unverified")
            throw new Error('Rating is outside range of 1-5');
        } else {
            logger.log("Rating verified")
            return rating;
        }
    } else {
        logger.error("Rating is not a number")
        throw new Error('Rating is not a number');
    }
}

/**
 * Check if content is of type string
 */
function isString(str) {
    logger.log(`ReviewsHelper.isString called on ${str}`);
    if(typeof str === 'string') {
        logger.log(`${str} is a String`)
        return str;
    } else {
        logger.error(`${str} is not a String`)
        throw new Error(`${str} must be of type String`);
    }
}

// Validation Middleware
function validationMiddleware(req, res, next) {
    logger.log("Validating POST Request Input")
    try {
        if(req.path === '/') {
            if(req.method === 'POST') {
                req.body.username = req.user.username;
                //validate the data from the req.body is valid
                req.body = validateNewReview(req.body);
            }
        }

        next();
    } catch(err) {
        res.json({message: err.message});
    }
}

module.exports = {
    validateNewReview,
    sanitizeImage,
    sanitizeRating,
    isString,
    validationMiddleware
}