const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const {DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand} = require('@aws-sdk/lib-dynamodb');
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

/**
 * createNewAccount will PUT a new account item in Accounts table in DynamoDB
 * 
 * @param {Object} Item containing username, hashed password, and isAdmin (BOOL) to be added to Accounts table
 * @returns The item that was added or throws an error
 */
async function createNewAccount(Item) {
    logger.info(`createNewAccount function called from AccountsDAO.js with param Item: ${JSON.stringify(Item)}`);
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

/**
 * getAccountByUsername will GET the account item with matching username
 * 
 * @param {String} username used as partition key
 * @returns data containing account Item or throws an error
 */
async function getAccountByUsername(username) {
    logger.info(`getAccountByUsername function called from AccountsDAO.js with param username: ${username}`);
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

/**
 * toggleAdmin will UPDATE (toggle) a table item's isAdmin attribute specified by username
 * 
 * @param {String} username used as partition key
 * @param {Boolean} isAdmin as account's current isAdmin attribute
 * @returns data containing updated account item or throws an error
 */
async function toggleAdmin(username, isAdmin) {
    logger.info(`toggleAdmin function called from AccountsDAO.js with params username: ${username}, isAdmin: ${isAdmin}`);   
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

/**
 * updateProfile will UPDATE a table item's aboutMe or imageURL based on params username and attributeName
 * 
 * @param {String} username to be used as partition key
 * @param {String} attributeName to specify which attribute to update
 * @param {String} attributeValue to specify data to be updated
 * @returns data containing updated account item or throws error
 */
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
