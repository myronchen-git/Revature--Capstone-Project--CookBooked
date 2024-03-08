const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  GetCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const { logger } = require("../util/logger");
const { buildQueryParamsForGetReviewsByRecipeId } = require("./ReviewsDAOHelpers");

const dotenv = require("dotenv");
const path = require("path");
const envPath = path.resolve("./.env");
dotenv.config({ path: envPath });

const client = new DynamoDBClient({
  region: process.env.REGION,
  credentials: fromIni({ profile: "cb_account" }),
});

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = process.env.REVIEWS_TABLENAME;

// ==================================================

/**
 * postReview method takes the Review object and then calls the PutCommand from aws-sdk library
 * to put the new Review into the Database, and then will return if the command was executed
 * successfully or ran into an error and returns false
 *
 * @param Item Review object that will be posted to the DynamoDB dataset
 * @returns boolean value to indicate success or failure of PutCommand
 */
async function postReview(Item) {
  //define the PutCommand
  const command = new PutCommand({
    TableName,
    Item,
  });

  //try-catch block to send the PutCommand to the database
  try {
    const data = await documentClient.send(command);
    const statusCode = data.$metadata.httpStatusCode === 200;
    logger.info(`${statusCode ? "Added Review to DB" : "Failed to Add Review to DB"}.`);
    return statusCode ? Item : null;
  } catch (err) {
    logger.error(err);
    throw new Error(err);
  }
}

/**
 * Retrieves reviews belonging to a recipe ID.
 *
 * @param {Object} param0 An Object containing String recipeId, Object ExclusiveStartKey, Number Limit.
 * These are the properties that are going to be passed into the QueryCommand.
 * @returns {{items, LastEvaluatedKey}} An Object containing Array of Review Objects and LastEvaluatedKey.  LastEvaluatedKey may be empty.
 * {items, LastEvaluatedKey}.
 */
async function getReviewsByRecipeId(props) {
  logger.info(`ReviewsDAO.getReviewsByRecipeId(${JSON.stringify(props)})`);

  const COMMAND = new QueryCommand(buildQueryParamsForGetReviewsByRecipeId(props));

  let data;
  try {
    data = await documentClient.send(COMMAND);
  } catch (err) {
    logger.error(err);
    throw err;
  }

  const REVIEWS_DATA = { items: data.Items, LastEvaluatedKey: data.LastEvaluatedKey };

  logger.info(`ReviewsDAO.getReviewsByRecipeId: Returning ${JSON.stringify(REVIEWS_DATA)}`);
  return REVIEWS_DATA;
}

// ==================================================

module.exports = {
  postReview,
  getReviewsByRecipeId,
};
