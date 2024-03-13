const { logger } = require("../util/logger");
const env = require("dotenv").config();
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

const TableName = process.env.REVIEWS_TABLENAME;
const AuthorIndexName = process.env.REVIEWS_TABLE_AUTHOR_INDEXNAME;
const IsRecentIndexName = process.env.REVIEWS_TABLE_ISRECENT_INDEXNAME;

// ==================================================

/**
 * Builds the properties to pass into the QueryCommand, and creates and returns a new Command.
 * recipeId, author, ExclusiveStartKey, and Limit are optional.  ExclusiveStartKey would contain the necessary
 * primary keys to query the related table.
 *
 * @param {Object} param0 Object containing String recipeId, String author, Object ExclusiveStartKey, or Number Limit.
 * @returns A QueryCommand object.
 */
function commandForGetReviewsFactory({ recipeId, author, ExclusiveStartKey, Limit }) {
  logger.info(
    `ReviewsDAOUtil.commandForGetReviewsFactory(${recipeId}, ${author}, ${JSON.stringify(
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
  } else {
    params = {
      TableName,
      IndexName: IsRecentIndexName,
      KeyConditionExpression: "isRecent = :isRecent",
      ExpressionAttributeValues: { ":isRecent": 1 },
      ScanIndexForward: false,
    };
  }

  if (ExclusiveStartKey) {
    params["ExclusiveStartKey"] = ExclusiveStartKey;
  }

  if (Limit) {
    params["Limit"] = Limit;
  }

  logger.info(
    `ReviewsDAOUtil.commandForGetReviewsFactory: Returning QueryCommand with ${JSON.stringify(
      params
    )}`
  );
  return new QueryCommand(params);
}

// ==================================================

module.exports = {
  commandForGetReviewsFactory,
};
