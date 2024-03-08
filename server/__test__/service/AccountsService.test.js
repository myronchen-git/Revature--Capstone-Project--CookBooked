const {
    createNewAccount,
    accountDoesExist,
    validateFields,
    containsSpecialCharacters,
    login,
    toggleAdmin,
    updateProfile
} = require('../../src/service/AccountsService');
const accountsDao = require('../../src/repository/AccountsDAO');
const encryption = require('../../src/util/encryption');


describe('createNewAccount Tests', () => {

    test('should return data successfully', async () => {
        const receivedData = {
            username: 'test_username2',
            password: 'password123'
        };
        jest.spyOn(accountsDao, 'createNewAccount').mockReturnValueOnce({
            Item: [{
                username: 'test_username2',
                password: 'password123'
            }]
        });

        const result = await createNewAccount(receivedData);
        const expected = {
            Item: [{
                username: 'test_username2',
                password: 'password123'
            }]
        };

        expect(result).toStrictEqual(expected);
    });

    test('should return username already exists', async () => {
        const receivedData = {
            username: 'test_username',
            password: 'password123'
        };
        jest.spyOn(accountsDao, 'getAccountByUsername').mockReturnValueOnce({
            Item: [{
                username: 'test_username'
            }]
        });

        const result = await createNewAccount(receivedData);

        expect(result).toBe('username already exists');
    });

    test('should return null -- missing required fields', async () => {
        const receivedData = {
            username: 'test_username',
            password: ''
        };

        const result = await createNewAccount(receivedData);
        const expected = null;

        expect(result).toBe(expected);
    });
})

describe('accountDoesExist Tests', () => {

    test('should return false', async () => {
        const username = 'test_username';
        jest.spyOn(accountsDao, 'getAccountByUsername').mockReturnValueOnce({});

        const result = await accountDoesExist(username);
        const expected = false;

        expect(result).toBe(expected);
    });

    test('should return true', async () => {
        const username = 'test_username';
        jest.spyOn(accountsDao, 'getAccountByUsername').mockReturnValueOnce({Item: [{
            username: 'test_username'
        }]});

        const result = await accountDoesExist(username);
        const expected = true;

        expect(result).toBe(expected);
    });

})

describe('validateFields Tests', () => {

    test('should return false -- missing username', () => {
        const data = {username: '', password: 'password'};

        const result = validateFields(data);
        const expected = false;

        expect(result).toBe(expected);
    });

    test('should return false -- missing password', () => {
        const data = {username: 'test_username', password: ''};

        const result = validateFields(data);
        const expected = false;

        expect(result).toBe(expected);
    });


    test('should return true -- no missing fields', () => {
        const data = {username: 'test_username', password: 'password'};

        const result = validateFields(data);
        const expected = true;

        expect(result).toBe(expected);
    })

    test('should return false -- username contains special characters', () => {
        const data = {username: 'test_u$ern@me^', password: 'password'};

        const result = validateFields(data);
        const expected = false;

        expect(result).toBe(expected);
    })
})

describe('containsSpecialCharacters Tests', () => {

    test('should return false -- username does not contain special characters', () => {
        const username1 = 'test_username';
        const username2 = 'test-username';
        const username3 = 'testusername';

        expect(containsSpecialCharacters(username1)).toBe(false);
        expect(containsSpecialCharacters(username2)).toBe(false);
        expect(containsSpecialCharacters(username3)).toBe(false);
    })

    test('should return true -- username contains special characters', () => {
        const username = 'te$t_u$rn@me';

        expect(containsSpecialCharacters(username)).toBe(true);
    })
})

describe('login Tests', () => {
    const username = 'username1';
    const password = 'password123'

    test('should successfully call getAccountByUsername, call encryption, and return data', async () => {
        const data = {Item: {username, password}}
        const daoSpy = jest.spyOn(accountsDao, 'getAccountByUsername').mockReturnValueOnce(data);
        const encryptSpy = jest.spyOn(encryption, 'validatePassword').mockReturnValueOnce(true);

        result = await login(username, password);

        expect(result).toStrictEqual(data);
        expect(daoSpy).toHaveBeenCalled();
        expect(encryptSpy).toHaveBeenCalled();
    })

    test('should successfully call getAccountByUsername and return null -- account does not exist', async () => {
        const data = {};
        const spy = jest.spyOn(accountsDao, 'getAccountByUsername').mockReturnValueOnce(data);

        result = await login(username, password);

        expect(result).toBe(null);
        expect(spy).toHaveBeenCalled();
    })

    test('should successfully call getAccountByUsername, call encryption, and return null -- incorrect password', async () => {
        const data = {Item: {username, password}}
        const daoSpy = jest.spyOn(accountsDao, 'getAccountByUsername').mockReturnValueOnce(data);
        const encryptSpy = jest.spyOn(encryption, 'validatePassword').mockReturnValueOnce(false);

        result = await login(username, password);

        expect(result).toBe(null);
        expect(daoSpy).toHaveBeenCalled();
        expect(encryptSpy).toHaveBeenCalled();
    })
})

describe('toggleAdmin Tests', () => {

    test('should successfully call toggleAdmin and getAccountByUsername from DAO', async () => {
        const daoToggleAdminSpy = jest.spyOn(accountsDao, 'toggleAdmin').mockReturnValueOnce({});
        const daoGetAccountByUsernameSpy = jest.spyOn(accountsDao, 'getAccountByUsername').mockReturnValueOnce({Item: {username: 'admin', isAdmin: true}});

        await toggleAdmin('username');

        expect(daoToggleAdminSpy).toHaveBeenCalled();
        expect(daoGetAccountByUsernameSpy).toHaveBeenCalled();
    })

    test('should succesfully call getAccountsByUsername, should NOT call toggleAdmin, and should return null -- username not in DB', async () => {
        const daoToggleAdminSpy = jest.spyOn(accountsDao, 'toggleAdmin');
        const daoGetAccountByUsernameSpy = jest.spyOn(accountsDao, 'getAccountByUsername').mockReturnValueOnce({});

        const result = await toggleAdmin('username');

        expect(daoGetAccountByUsernameSpy).toHaveBeenCalled();
        expect(daoToggleAdminSpy).not.toHaveBeenCalled();
        expect(result).toBe(null);
    })
})

describe('updateProfile Tests', () => {
    let body = {
        aboutMe: 'some aboutMe text',
        imageUrl: 'some/image/path.png'
    };
    const username = 'username';

    afterEach(() => {
        body.aboutMe = 'some aboutMe text';
        body.imageUrl = 'some/image/path.png';
    });

    test('should return array: data with length of 2, should successfully call updateProfile from accountsDao twice with correct params', async () => {
        const updateProfileSpy = jest.spyOn(accountsDao, 'updateProfile')
            .mockReturnValueOnce('updated item 1')
            .mockReturnValueOnce('updated item 2');
        
        const result = await updateProfile(username, body);

        expect(result).toHaveLength(2);
        expect(updateProfileSpy).toHaveBeenCalledTimes(2);
        expect(updateProfileSpy).toHaveBeenCalledWith(username, 'aboutMe', body.aboutMe);
        expect(updateProfileSpy).toHaveBeenCalledWith(username, 'imageUrl', body.imageUrl);
    })

    test('should return array: data with length of 1, should successfully call updateProfile with correct params (aboutMe)', async () => {
        delete body.imageUrl;
        const updateProfileSpy = jest.spyOn(accountsDao, 'updateProfile').mockReturnValueOnce('updated item 1');

        const result = await updateProfile(username, body);

        expect(result).toHaveLength(1);
        expect(updateProfileSpy).toHaveBeenCalledTimes(1);
        expect(updateProfileSpy).toHaveBeenCalledWith(username, 'aboutMe', body.aboutMe);
    })

    test('should return array: data with length of 1, should successfully call updateProfile with correct params (imageUrl)', async () => {
        delete body.aboutMe;
        const updateProfileSpy = jest.spyOn(accountsDao, 'updateProfile').mockReturnValueOnce('updated item 1');

        const result = await updateProfile(username, body);

        expect(result).toHaveLength(1);
        expect(updateProfileSpy).toHaveBeenCalledTimes(1);
        expect(updateProfileSpy).toHaveBeenCalledWith(username, 'imageUrl', body.imageUrl);
    })

})
