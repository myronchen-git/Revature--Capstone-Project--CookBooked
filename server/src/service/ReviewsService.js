const reviewsDao = require("../repository/ReviewsDAO");
const uuid = require("uuid");
const { logger } = require("../util/logger");
const ArgumentError = require("../errors/ArgumentError");

// ==================================================

async function createNewReview(receivedData) {
  logger.info("CreateNewReview method called");
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
      createdAt: Date.now(),
    };
    //create the new post
    const data = await reviewsDao.postReview(review);
    //return the review object to show back
    return data;
  } catch (err) {
    logger.error(err);
    throw Error(err.message);
  }
}

/**
 * Gets reviews belonging to a recipe or author.  Also gets reviews that are ordered by creation time.
 *
 * @param {Object} requestQueryParams Object that may contain String recipeId or String author.
 * May contain Object ExclusiveStartKey and Number Limit.
 * @returns {{items, LastEvaluatedKey}} An Object containing an Array of Review Objects and LastEvaluatedKey.
 * LastEvaluatedKey may be empty.
 * @throws Currently, an Error if props argument does not contain String recipeId.
 */
async function getReviews(requestQueryParams) {
  logger.info(`ReviewsService.getReviews(${JSON.stringify(requestQueryParams)})`);

  const MAX_LIMIT = 100;

  let reviewsData;
  if (requestQueryParams.recipeId) {
    const { Limit } = requestQueryParams;

    // max limit of 100 is arbitrary
    if (Limit !== undefined && (Limit <= 0 || Limit > MAX_LIMIT)) {
      throw new ArgumentError("Argument 'Limit' is outside of allowed range.  Range is 1 to 100.");
    }

    // constructing PROPS
    const PROPS = (({ recipeId, ExclusiveStartKey, Limit }) => ({
      recipeId,
      ExclusiveStartKey,
      Limit,
    }))(requestQueryParams);

    // checking for a Limit
    PROPS.Limit = PROPS.Limit || MAX_LIMIT;

    reviewsData = await reviewsDao.getReviewsByRecipeId(PROPS);
  } else {
    // TODO
    // query author-createdAt-index
    // scan createdAt-index
    logger.error("Getting reviews by other query parameters are not yet supported.");
    throw new Error("Getting reviews by other query parameters are not yet supported.");
  }

  logger.info(`ReviewsService.getReviews: Returning ${JSON.stringify(reviewsData)}`);
  return reviewsData;
}

/**
 * Delete the Review and return the deleted review item
 * Will consequently delete all the comments attached to the review as well
 * 
 * @param {Object} receivedData 
 * @returns gets the deleted review and then returns it
 */
async function deleteReview(receivedData) {
  //if there was no recipeId to make a composite key then return a Argument Error
  if(receivedData.recipeId === undefined || !receivedData.recipeId) {
    throw new ArgumentError("Recipe Id must be defined in Request Body");
  } else {
    //call the delete method from DAO
    try{
      //will return the deleted item from the DB
      const data = await reviewsDao.deleteReviewById(receivedData);
      return data;
    } catch(err) {
      throw Error(err);
    }
  }
}

// ==================================================

module.exports = {
  createNewReview,
  getReviews,
  deleteReview
};
