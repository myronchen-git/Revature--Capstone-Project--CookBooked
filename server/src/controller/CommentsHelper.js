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

module.exports = {
    validateNewComment
}