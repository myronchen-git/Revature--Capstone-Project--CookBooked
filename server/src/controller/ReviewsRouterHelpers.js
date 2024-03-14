const { logger } = require("../util/logger");
const uuid = require("uuid");
const ArgumentError = require("../errors/ArgumentError");

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
 * @throws {ArgumentError} If user input is invalid.
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
    let startKey;
    try {
      startKey = JSON.parse(ExclusiveStartKey);
    } catch (err) {
      logger.error(
        `ReviewsRouterHelpers.sanitizeGetReviewsQueryParams: ExclusiveStartKey is not in proper JSON.\n` +
          `ExclusiveStartKey = ${ExclusiveStartKey}.\n` +
          `${err}`
      );
      throw new ArgumentError("ExclusiveStartKey is not in proper JSON.");
    }

    if (startKey.recipeId && startKey.reviewId) {
      const CONVERTED_RECIPE_ID = String(startKey.recipeId);
      const CONVERTED_REVIEW_ID = convertUuid(startKey.reviewId);

      QUERY_PARAMS.ExclusiveStartKey = {
        recipeId: CONVERTED_RECIPE_ID,
        reviewId: CONVERTED_REVIEW_ID,
      };

      if (startKey.author && startKey.createdAt) {
        const CONVERTED_AUTHOR = String(startKey.author).toLowerCase().trim();
        const CONVERTED_CREATED_AT = convertNumber(startKey.createdAt);

        QUERY_PARAMS.ExclusiveStartKey.author = CONVERTED_AUTHOR;
        QUERY_PARAMS.ExclusiveStartKey.createdAt = CONVERTED_CREATED_AT;
      } else if (startKey.createdAt) {
        const CONVERTED_CREATED_AT = convertNumber(startKey.createdAt);

        QUERY_PARAMS.ExclusiveStartKey.createdAt = CONVERTED_CREATED_AT;
      } else if (startKey.author) {
        logger.error(
          `ReviewsRouterHelpers.sanitizeGetReviewsQueryParams: ` +
            `ExclusiveStartKey needs author-createdAt pair.\n` +
            `ExclusiveStartKey = ${ExclusiveStartKey}.`
        );
        throw new ArgumentError(
          "An ExclusiveStartKey with author needs to have the createdAt parameter."
        );
      }
    } else {
      logger.error(
        `ReviewsRouterHelpers.sanitizeGetReviewsQueryParams: ` +
          `ExclusiveStartKey is missing required recipeId & reviewId.\n` +
          `ExclusiveStartKey = ${ExclusiveStartKey}.`
      );
      throw new ArgumentError("ExclusiveStartKey is missing required recipeId & reviewId.");
    }
  }

  if (Limit) {
    QUERY_PARAMS.Limit = convertNumber(Limit);
  }

  logger.info(
    `ReviewsRouterHelpers.sanitizeGetReviewsQueryParams: Returning ${JSON.stringify(QUERY_PARAMS)}`
  );
  return QUERY_PARAMS;
}

/**
 * Takes any value that can be a UUID and converts it to a valid UUID String.
 * @param {*} recipeId A value that can be a UUID.
 * @returns A UUID String.
 * @throws {ArgumentError} If the UUID is not valid.
 */
function convertUuid(Uuid) {
  if (Uuid) {
    const CONVERTED_UUID = String(Uuid);

    if (uuid.validate(CONVERTED_UUID)) {
      return CONVERTED_UUID;
    }
  }

  logger.error(`ReviewsRouterHelpers.convertUuid: ${Uuid} is not a valid UUID.`);
  throw new ArgumentError(`${Uuid} is not a valid UUID.`);
}

/**
 * Takes any value that may be a number and converts it to an integer Number, rounding it to the nearest integer.
 *
 * @param {*} n A value that can be a number.
 * @throws {ArgumentError} If value is not a number.
 */
function convertNumber(n) {
  if (!isNaN(n)) {
    return Math.round(Number(n));
  }

  logger.error(`ReviewsRouterHelpers.convertNumber: ${n} is not a valid number.`);
  throw new ArgumentError(`${n} is not a valid number.`);
}

// ==================================================

module.exports = {
  sanitizeGetReviewsQueryParams,
  convertUuid,
};
