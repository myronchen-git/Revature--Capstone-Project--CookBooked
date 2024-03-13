const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  GetCommand,
  QueryCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { logger } = require("../util/logger");
const { buildQueryParamsForGetReviews } = require("./ReviewsDAOHelpers");

const dotenv = require("dotenv");
const path = require("path");
const { stat } = require("fs");
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
 * Retrieves reviews belonging to a recipe ID or author.
 *
 * @param {Object} props An Object containing String recipeId, author, Object ExclusiveStartKey, Number Limit.
 * These are the properties that are going to be passed into the QueryCommand.
 * @returns {{items, LastEvaluatedKey}} An Object containing Array of Review Objects and LastEvaluatedKey.
 * LastEvaluatedKey may be empty. {items, LastEvaluatedKey}.
 */
async function getReviews(props) {
  logger.info(`ReviewsDAO.getReviews(${JSON.stringify(props)})`);

  const COMMAND = new QueryCommand(buildQueryParamsForGetReviews(props));

  let data;
  try {
    data = await documentClient.send(COMMAND);
  } catch (err) {
    logger.error(err);
    throw err;
  }

  const REVIEWS_DATA = { items: data.Items, LastEvaluatedKey: data.LastEvaluatedKey };

  logger.info(`ReviewsDAO.getReviews: Returning ${JSON.stringify(REVIEWS_DATA)}`);
  return REVIEWS_DATA;
}

/**
 * This function calls DynamoDBClient to run a DeleteCommand to delete a specific review
 * 
 * @param {Object} receivedData Information received about Review to Delete 
 */
async function deleteReviewById(receivedData) {
  logger.info("Calling ReviewsDAO.getOneReviewByID");

  const command = new DeleteCommand({
    TableName,
    Key: {
      "recipeId": receivedData.recipeId,
      "reviewId": receivedData.reviewId
    }
  })

  //try this Delete Command and if it successful return true
  try {
    const data = await documentClient.send(command);
    const statusCode = data.$metadata.httpStatusCode === 200;
    if(!statusCode) {
      throw new Error("Status Code not OK");
    } else {
      // delete the comments under this review as well
      
    }
  } catch(err) {
    logger.error(err);
    throw new Error(err);
  }
}

/**
 * This is a helper function for gettin one Review by its PK and SK values
 *
 * @param {Object} receivedData
 * @returns a review based of the PK and SK provided
 */
async function getOneReviewById(receivedData) {
  logger.info("Calling ReviewsDAO.getOneReviewByID");

  const command = new GetCommand({
    TableName,
    Key: {
      recipeId: receivedData.recipeId,
      reviewId: receivedData.reviewId,
    },
  });

  try {
    const data = await documentClient.send(command);
    logger.info("Got Review");
    return data.Item;
  } catch (err) {
    logger.error(err);
    throw new Error(err);
  }
}

// ==================================================

module.exports = {
  postReview,
  getReviews,
  deleteReviewById,
  getOneReviewById
};
