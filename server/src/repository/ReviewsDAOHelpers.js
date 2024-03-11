const { logger } = require("../util/logger");
const env = require("dotenv").config();

const TableName = process.env.REVIEWS_TABLENAME;
const AuthorIndexName = process.env.REVIEWS_TABLE_AUTHOR_INDEXNAME;

// ==================================================

/**
 * Requires recipe ID or author.  ExclusiveStartKey and Limit are optional.  Takes in those arguments and creates the
 * QueryCommand argument.
 *
 * @param {Object} param0 Object containing String recipeId or author,
 * and optionally Object ExclusiveStartKey and Number Limit.
 * @returns The parameter to pass into QueryCommand.
 */
function buildQueryParamsForGetReviews({ recipeId, author, ExclusiveStartKey, Limit }) {
  logger.info(
    `ReviewsDAOUtil.buildQueryParamsForGetReviews(${recipeId}, ${author}, ${JSON.stringify(
      ExclusiveStartKey
    )}, ${Limit})`
  );

  let params;
  if (recipeId) {
    params = {
      TableName,
      KeyConditionExpression: "recipeId = :recipeId",
      ExpressionAttributeValues: { ":recipeId": recipeId },
    };
  } else if (author) {
    params = {
      TableName,
      IndexName: AuthorIndexName,
      KeyConditionExpression: "author = :author",
      ExpressionAttributeValues: { ":author": author },
      ScanIndexForward: false,
    };
  }

  if (ExclusiveStartKey) {
    params["ExclusiveStartKey"] = ExclusiveStartKey;
  }

  if (Limit) {
    params["Limit"] = Limit;
  }

  logger.info(`ReviewsDAOUtil.buildQueryParamsForGetReviews: Returning ${JSON.stringify(params)}`);
  return params;
}

// ==================================================

module.exports = {
  buildQueryParamsForGetReviews,
};
