const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand, GetCommand, QueryCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { logger } = require('../util/logger');

const dotenv = require('dotenv');
const path = require('path');
const envPath = path.resolve('./.env')
dotenv.config({path: envPath});

const client = new DynamoDBClient({
    region: process.env.REGION,
    credentials: fromIni({profile: "cb_account"})
});

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = process.env.COMMENTS_TABLENAME;

/**
 * Post a comment to the COMMENTS_TABLE in Dynamo
 * 
 * @param {Object} Item contains all info needed to create a Comment
 * @returns The item that was posted or throws an error
 */
async function postComment(Item) {
    //define the PutCommand
    const command = new PutCommand({
        TableName, 
        Item
    })

    //try-catch block to send the PutCommand to the database
    try {
        const data = await documentClient.send(command);
        const statusCode = data.$metadata.httpStatusCode === 200;
        logger.info(`${statusCode ? "Added Review to DB" : "Failed to Add Review to DB"}.`);
        return statusCode ? Item : null;
    } catch(err) {
        logger.error(err);
        throw new Error(err);
    }
}

async function getCommentsByReviewId(reviewId) {
    logger.info("CommentsDAO.getCommentsByReviewId Called");
    //define the QueryCommand
    const command = new QueryCommand({
        TableName,
        IndexName: "createdAt-index",
        KeyConditionExpression: "reviewId = :val",
        ExpressionAttributeValues: {
            ":val": reviewId
        },
        ScanIndexForward: false
    })

    //try catch for the QueryCommand
    try {
        const data = await documentClient.send(command);
        const statusCode = data.$metadata.httpStatusCode === 200;
        logger.info(`${statusCode ? "Retrived Comments From DB" : "Failed to Retrieve Comments From DB"}.`);
        return statusCode ? data.Items : null;
    } catch(err) {
        logger.error(err);
        throw new Error(err);
    }
}

/**
 * This is a helper function for gettin one Comment by its PK and SK values
 *
 * @param {Object} receivedData
 * @returns a comment based of the PK and SK provided
 */
async function getOneCommentById(receivedData) {
    logger.info("Calling ReviewsDAO.getOneReviewByID");
  
    const command = new GetCommand({
      TableName,
      Key: {
        "reviewId": receivedData.reviewId,
        "commentId": receivedData.commentId
      }
    })
  
    try {
      const data = await documentClient.send(command);
      logger.info("Got Comment");
      return data.Item;
    } catch(err) {
      logger.error(err);
      throw new Error(err);
    }
}

/**
 * DAO function to delete a comment by its ReviewId and CommentId Composite Key
 * 
 * @param {Object} receivedData data regarding the deletion of the comment
 * @returns true if the status code is 200 or null if not or throws an error
 */
async function deleteCommentById(receivedData) {
    logger.info("Calling CommentsDAO.getOneReviewByID");

    const command = new DeleteCommand({
      TableName,
      Key: {
        "reviewId": receivedData.reviewId,
        "commentId": receivedData.commentId
      }
    })

    //try this Delete Command and if it successful return true
    try {
      const data = await documentClient.send(command);
      const statusCode = data.$metadata.httpStatusCode === 200;
      if(!statusCode) {
        throw new Error("Status Code not OK");
      }
    } catch(err) {
      logger.error(err);
      throw new Error(err);
    }
}

async function deleteCommentsUnderReview(reviewId) {
  //try catch block will catch any errors thrown by GetCommentsByReviewId and deleteCommentByID
  try {
    //get the comments
    const comments = await getCommentsByReviewId(reviewId);
    if(comments.length == 0) {
      throw new Error("No Comments Under This Review ID");
    }
    //loop through the comments and call delete on all of them
    comments.forEach(async (comment) => {
      const commentData = { reviewId: comment.reviewId, commentId: comment.commentId };
      await deleteCommentById(commentData);
    })
  } catch(err) {
    throw new Error(err);
  }
}

module.exports = {
    postComment,
    getCommentsByReviewId,
    getOneCommentById,
    deleteCommentById,
    deleteCommentsUnderReview
}