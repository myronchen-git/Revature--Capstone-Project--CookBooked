const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');
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

module.exports = {
    postComment
}