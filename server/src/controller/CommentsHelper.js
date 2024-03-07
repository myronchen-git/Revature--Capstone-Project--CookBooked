const { logger } = require("../util/logger");
const { isString } = require('./ReviewsHelper');

function validateNewComment(submittedComment) {
    logger.info(`validateNewComment(${JSON.stringify(submittedComment)})`);

    let { reviewId, username, content } = submittedComment;

    //make sure the reviewID and Content are strings
    reviewId = isString(reviewId);
    content = isString(content);

    if(reviewId && username && content) {
        const validatedComment = { reviewId, username, content };
        logger.info(`Validated Comment ${JSON.stringify(validatedComment)}`);
        return validatedComment;
    } else {
        logger.error(`Invalid request body parameters in ${JSON.stringify(submittedComment)}`);
        throw new Error("Invalid request to the server");
    }
}

// Validation Middleware
function validationMiddleware(req, res, next) {
    try {
        if(req.path === '/') {
            if(req.method === 'POST') {
                req.body.username = req.user.username;
                //validate the data from the req.body is valid
                req.body = validateNewComment(req.body);
            }
        }

        next();
    } catch(err) {
        res.json({message: err.message});
    }
}

module.exports = {
    validateNewComment,
    validationMiddleware
}