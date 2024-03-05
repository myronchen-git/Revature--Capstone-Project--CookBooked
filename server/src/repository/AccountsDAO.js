const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const {DynamoDBDocumentClient, PutCommand, QueryCommand} = require('@aws-sdk/lib-dynamodb');
const {fromIni} = require('@aws-sdk/credential-provider-ini');

const client = new DynamoDBClient({
    region: 'us-west-1',
    credentials: fromIni({profile: 'cb_account'})
});
const documentClient = DynamoDBDocumentClient.from(client);
const TableName = 'CookedBook-Accounts';

async function createNewAccount(Item) {
    const command = new PutCommand({
        TableName,
        Item
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch (error) {
        // logger.error(error);
        console.error(error);
    }
    return null;
}

async function getAccountByUsername(username) {
    const command = new QueryCommand({
        TableName,
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: {':username': username}
    });

    try {
        const data = await documentClient.send(command);
        return data;
    } catch (error) {
        // logger.error(error);
        console.error(error);
    }
    return null;
}


module.exports = {
    createNewAccount,
    getAccountByUsername
}
