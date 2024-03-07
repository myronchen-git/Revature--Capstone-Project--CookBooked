const { logger } = require("../util/logger");
const uuid = require("uuid");

// ==================================================

/**
 * Converts user input data into their valid types.  For instance, converts the user input for review ID into a valid
 * UUID String, or converts the user input for Limit into a valid integer Number.  If the properties are not valid, they
 * will not be returned.
 *
 * @param {Object} requestQueryParams An Object containing recipeId, author, ExclusiveStartKey, or Limit.
 * @returns {Object} An Object that may contain recipeId, author, ExclusiveStartKey, or Limit,
 * but in their valid data types.
 */
function sanitizeGetReviewsQueryParams(requestQueryParams) {
  logger.info(
    `ReviewsRouterHelpers.sanitizeGetReviewsQueryParams(${JSON.stringify(requestQueryParams)})`
  );

  const { recipeId, ExclusiveStartKey, Limit } = requestQueryParams;
  const QUERY_PARAMS = {};

  if (recipeId) {
    QUERY_PARAMS.recipeId = recipeId;
  }

  if (ExclusiveStartKey) {
    const START_KEY = JSON.parse(ExclusiveStartKey);

    if (START_KEY.recipeId && START_KEY.reviewId) {
      const CONVERTED_RECIPE_ID = String(START_KEY.recipeId);
      const CONVERTED_REVIEW_ID = convertUuid(START_KEY.reviewId);

      if (CONVERTED_RECIPE_ID && CONVERTED_REVIEW_ID) {
        QUERY_PARAMS.ExclusiveStartKey = {
          recipeId: CONVERTED_RECIPE_ID,
          reviewId: CONVERTED_REVIEW_ID,
        };
      }
    }
  }

  if (Limit && !isNaN(Limit)) {
    QUERY_PARAMS.Limit = Math.round(Number(Limit));
  }

  logger.info(
    `ReviewsRouterHelpers.sanitizeGetReviewsQueryParams: Returning ${JSON.stringify(QUERY_PARAMS)}`
  );
  return QUERY_PARAMS;
}

/**
 * Takes any value that can be a UUID and converts it to a valid UUID String, or returns null.
 * @param {*} recipeId A value that can be a UUID.
 * @returns A UUID String or null.
 */
function convertUuid(Uuid) {
  if (Uuid) {
    const CONVERTED_UUID = String(Uuid);

    if (uuid.validate(CONVERTED_UUID)) {
      return CONVERTED_UUID;
    }
  }

  return null;
}

// ==================================================

module.exports = {
  sanitizeGetReviewsQueryParams,
  convertUuid,
};
