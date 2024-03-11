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
const { buildQueryParamsForGetReviewsByRecipeId } = require("./ReviewsDAOHelpers");

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

async function deleteReviewById(receivedData) {
  logger.info("Calling ReviewsDAO.getOneReviewByID");
  //get the Item to be Deleted so I can return it later
  const itemToReturn = await getOneReviewById(receivedData);

  //if the item was found then run the delete command else throw an error that the review does not exist
  if (itemToReturn) {
    const command = new DeleteCommand({
      TableName,
      Key: {
        recipeId: receivedData.recipeId,
        reviewId: receivedData.reviewId,
      },
    });

    //try this Delete Command and if it successful return the Item
    try {
      const data = await documentClient.send(command);
      const statusCode = data.$metadata.httpStatusCode === 200;
      if (statusCode) {
        logger.info("Deleted Review from DB");
        //call helper function to delete all comments under this review
        //deleteAllCommentsUnderReview(receivedData.reviewId);
        return itemToReturn;
      } else {
        logger.info("Failed to Delete Review from DB");
        return null;
      }
    } catch (err) {
      logger.error(err);
      throw new Error(err);
    }
  } else {
    throw new Error("Review does not Exist");
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
  getReviewsByRecipeId,
  deleteReviewById,
};
