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
 * but in their valid data types.  If ExclusiveStartKey exists, then it contains either recipeId & reviewId or
 * recipeId, reviewId, author, & createdAt.
 */
function sanitizeGetReviewsQueryParams(requestQueryParams) {
  logger.info(
    `ReviewsRouterHelpers.sanitizeGetReviewsQueryParams(${JSON.stringify(requestQueryParams)})`
  );

  const { recipeId, author, ExclusiveStartKey, Limit } = requestQueryParams;
  const QUERY_PARAMS = {};

  if (recipeId) {
    QUERY_PARAMS.recipeId = recipeId;
  }

  if (author) {
    QUERY_PARAMS.author = author.toLowerCase().trim();
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

        if (START_KEY.author && START_KEY.createdAt) {
          const CONVERTED_AUTHOR = String(START_KEY.author).toLowerCase().trim();
          const CONVERTED_CREATED_AT = convertNumber(START_KEY.createdAt);

          if (CONVERTED_AUTHOR && CONVERTED_CREATED_AT) {
            QUERY_PARAMS.ExclusiveStartKey.author = CONVERTED_AUTHOR;
            QUERY_PARAMS.ExclusiveStartKey.createdAt = CONVERTED_CREATED_AT;
          }
        }
      }
    }
  }

  const CONVERTED_LIMIT = convertNumber(Limit);
  if (CONVERTED_LIMIT) {
    QUERY_PARAMS.Limit = CONVERTED_LIMIT;
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

/**
 * Takes any value that may be a number and converts it to an integer Number, rounding it to the nearest integer.
 * Else, returns null.
 *
 * @param {*} n A value that can be a number.
 * @returns An integer Number or null.
 */
function convertNumber(n) {
  return !isNaN(n) ? Math.round(Number(n)) : null;
}

// ==================================================

module.exports = {
  sanitizeGetReviewsQueryParams,
  convertUuid,
};
