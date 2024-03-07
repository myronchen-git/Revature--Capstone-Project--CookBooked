const {cleanUsernamePassword} = require('../../src/controller/RouterHelpers');


describe('cleanUsernamePassword Tests', () => {

    test('should return input with no changes', () => {
        const body = {username: 'username1', password: 'password123'};

        const result = cleanUsernamePassword(body);

        expect(result).toStrictEqual(body);
    }) 

    test('should return empty username or password fields as undefined', () => {
        // empty username
        const body1 = {username: '', password: 'password123'};

        const expected1 = {username: undefined, password: 'password123'};
        const result1 = cleanUsernamePassword(body1);

        expect(result1).toStrictEqual(expected1);

        // empty password
        const body2 = {username: 'username1', password: ''};

        const expected2 = {username: 'username1', password: undefined};
        const result2 = cleanUsernamePassword(body2);

        expect(result2).toStrictEqual(expected2);
    })

    test('should return null with undefined username or password', () => {
        const body1 = {username: 'username'};
        const body2 = {password: 'password123'};

        const expected1 = {username: 'username', password: undefined}
        const result1 = cleanUsernamePassword(body1);
        expect(result1).toStrictEqual(null);

        const expected2 = {username: undefined, password: 'password123'}
        const result2 = cleanUsernamePassword(body2);
        expect(result2).toStrictEqual(null);
    })


    test('should return input with username lowercase and trimmed', () => {
        const body = {username: '  USERNAMe1 ', password: 'password123'};

        const expected = {username: 'username1', password: 'password123'};
        const result = cleanUsernamePassword(body);

        expect(result).toStrictEqual(expected);
    })

    test('should return input with password trimmed', () => {
        const body = {username: 'username1', password: 'password123    '};

        const expected = {username: 'username1', password: 'password123'};
        const result = cleanUsernamePassword(body);

        expect(result).toStrictEqual(expected);
    })

    test('should return null if values are not of type string', () => {
        const body = {username: {'username': 'username1'}, password: 1234};

        const result = cleanUsernamePassword(body);

        expect(result).toBe(null);
    })
})
