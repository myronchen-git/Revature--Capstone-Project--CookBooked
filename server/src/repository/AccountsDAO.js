const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const {DynamoDBDocumentClient, PutCommand, QueryCommand, GetCommand, UpdateCommand} = require('@aws-sdk/lib-dynamodb');
const {fromIni} = require('@aws-sdk/credential-provider-ini');
const {logger} = require('../util/logger');

const dotenv = require('dotenv');
const path = require('path');
const envPath = path.resolve('./.env')
dotenv.config({path: envPath});

const region = process.env.REGION;
const client = new DynamoDBClient({
    region: region,
    credentials: fromIni({profile: 'cb_account'})
});
const documentClient = DynamoDBDocumentClient.from(client);
const TableName = process.env.ACCOUNTS_TABLENAME;

async function createNewAccount(Item) {
    logger.info('createNewAccount function called from AccountsDAO.js');
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
    logger.info('getAccountByUsername function called from AccountsDAO.js');
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

async function toggleAdmin(username, isAdmin) {
    logger.info('toggleAdmin function called from AccountsDAO.js');   
    const command = new UpdateCommand({
        TableName,
        Key: {username: username},
        UpdateExpression: 'SET #isAdmin = :isAdmin',
        ExpressionAttributeNames: {'#isAdmin': 'isAdmin'},
        ExpressionAttributeValues: {':isAdmin': !isAdmin},
        ReturnValues: 'ALL_NEW'
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch (error) {
        logger.error(error);
    }
    return null;
}


async function updateProfile(username, attributeName, attributeValue) {
    logger.info(`updateProfile function called from AccountsDAO.js with params username: ${username}, attributeName: ${attributeName}, attributeValue: ${attributeValue}`);
    const command = new UpdateCommand({
        TableName,
        Key: {username: username},
        UpdateExpression: `SET #attName = :attValue`,
        ExpressionAttributeNames: {'#attName': attributeName},
        ExpressionAttributeValues: {':attValue': attributeValue},
        ReturnValues: 'ALL_NEW'
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch (err) {
        logger.error(err);
    }
    return null;
}

module.exports = {
    createNewAccount,
    getAccountByUsername,
    toggleAdmin,
    updateProfile
}
