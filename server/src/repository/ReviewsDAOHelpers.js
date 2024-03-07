const { logger } = require("../util/logger");
const env = require("dotenv").config();

// const TableName = process.env.REVIEWS_TABLE_NAME;
const TableName = "CookBooked-Reviews";

// ==================================================

/**
 * Requires recipe ID.  ExclusiveStartKey and Limit are optional.  Takes in those arguments and creates the
 * QueryCommand argument.
 *
 * @param {Object} param0 Object containing String recipeId, and optionally Object ExclusiveStartKey and Number Limit.
 * @returns The parameter to pass into QueryCommand.
 */
function buildQueryParamsForGetReviewsByRecipeId({ recipeId, ExclusiveStartKey, Limit }) {
  logger.info(
    `ReviewsDAOUtil.buildQueryParamsForGetReviewsByRecipeId(${recipeId}, ${JSON.stringify(
      ExclusiveStartKey
    )}, ${Limit})`
  );

  const PARAMS = {
    TableName,
    KeyConditionExpression: "recipeId = :recipeId",
    ExpressionAttributeValues: { ":recipeId": recipeId },
  };

  if (ExclusiveStartKey) {
    PARAMS["ExclusiveStartKey"] = ExclusiveStartKey;
  }

  if (Limit) {
    PARAMS["Limit"] = Limit;
  }

  logger.info(
    `ReviewsDAOUtil.buildQueryParamsForGetReviewsByRecipeId: Returning ${JSON.stringify(PARAMS)}`
  );
  return PARAMS;
}

// ==================================================

module.exports = {
  buildQueryParamsForGetReviewsByRecipeId,
};
