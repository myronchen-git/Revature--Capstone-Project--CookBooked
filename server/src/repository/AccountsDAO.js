const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const {DynamoDBDocumentClient, PutCommand, QueryCommand, GetCommand} = require('@aws-sdk/lib-dynamodb');
const {fromIni} = require('@aws-sdk/credential-provider-ini');
const logger = require('../util/logger');

const dotenv = require('dotenv');
const path = require('path');
const envPath = path.resolve('./.env')
dotenv.config({path: envPath});

const client = new DynamoDBClient({
    region: 'us-west-1',
    credentials: fromIni({profile: 'cb_account'})
});
const documentClient = DynamoDBDocumentClient.from(client);
const TableName = process.env.ACCOUNTS_TABLENAME;

async function createNewAccount(Item) {
    const command = new PutCommand({
        TableName,
        Item
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch (error) {
        logger.error(error);
    }
    return null;
}

async function getAccountByUsername(username) {
    const command = new GetCommand({
        TableName,
        Key: {username: username}
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch (error) {
        logger.error(error)
    }
    return null;
}


module.exports = {
    createNewAccount,
    getAccountByUsername
}
