const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');
const { logger } = require('../util/logger');
const dotenv = require('dotenv');
const path = require('path');

// Get the path to the .env file
const envPath = path.resolve(__dirname, '../../../.env');

// Config the .env file
dotenv.config({ path: envPath });

const client = new DynamoDBClient({
    region: process.env.REGION,
    credentials: fromIni({profile: "cb_account"})
});

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = process.env.REVIEWS_TABLE_NAME;

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
        Item
    })

    //try-catch block to send the PutCommand to the database
    try {
        await documentClient.send(command);
        logger.info("Successfully added the Review!");
        return true;
    } catch(err) {
        logger.error(err);
        throw new Error(err);
    }
}

module.exports = {
    postReview
}