const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand, GetCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
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

module.exports = {
    postComment,
    getCommentsByReviewId
}