const {cleanUsernamePassword} = require('../../src/controller/RouterHelpers');


describe('cleanUsernamePassword Tests', () => {

    test('should return input with no changes', () => {
        const body = {username: 'username1', password: 'password123', isAdmin: false};

        const result = cleanUsernamePassword(body);

        expect(result).toStrictEqual(body);
    }) 

    test('should return input with empty username or password fields as undefined', () => {
        // empty username
        const body1 = {username: '', password: 'password123', isAdmin: true};

        const expected1 = {username: undefined, password: 'password123', isAdmin: true};
        const result1 = cleanUsernamePassword(body1);

        expect(result1).toStrictEqual(expected1);

        // empty password
        const body2 = {username: 'username1', password: '', isAdmin: true};

        const expected2 = {username: 'username1', password: undefined, isAdmin: true};
        const result2 = cleanUsernamePassword(body2);

        expect(result2).toStrictEqual(expected2);
    })

    test('should return input with missing username or password as undefined', () => {
        const body1 = {username: 'username', isAdmin: true};
        const body2 = {password: 'password123', isAdmin: true};

        const expected1 = {username: 'username', password: undefined, isAdmin: true}
        const result1 = cleanUsernamePassword(body1);
        expect(result1).toStrictEqual(expected1);

        const expected2 = {username: undefined, password: 'password123', isAdmin: true}
        const result2 = cleanUsernamePassword(body2);
        expect(result2).toStrictEqual(expected2);
    })

    test('should not add isAdmin field to object if it was not provided with input', () => {
        const body = {username: 'username1', password: 'password123'};

        const result = cleanUsernamePassword(body);

        expect(result).toStrictEqual(body);
    })

    test('should return input with username lowercase and trimmed', () => {
        const body = {username: '  USERNAMe1 ', password: 'password123', isAdmin: true};

        const expected = {username: 'username1', password: 'password123', isAdmin: true};
        const result = cleanUsernamePassword(body);

        expect(result).toStrictEqual(expected);
    })

    test('should return input with password trimmed', () => {
        const body = {username: 'username1', password: 'password123    ', isAdmin: true};

        const expected = {username: 'username1', password: 'password123', isAdmin: true};
        const result = cleanUsernamePassword(body);

        expect(result).toStrictEqual(expected);
    })
})
