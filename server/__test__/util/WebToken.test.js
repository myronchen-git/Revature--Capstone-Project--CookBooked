const {
    jwt,
    generateToken,
    authenticateToken,
    isAdmin
}  = require('../../src/util/WebToken');


describe('generateToken Tests', () => {

    test('should successfully call jwt.sign and return a value that is not undefined', () => {
        const input = {username: 'username', isAdmin: false};
        const spy = jest.spyOn(jwt, 'sign')

        const token = generateToken(input);

        expect(spy).toHaveBeenCalled();
        expect(token).not.toBe(undefined);
    })
})

describe('isAdmin Tests', () => {

    test('should successfully call jwt.decode', () => {
        const token = 'placeholder_token';
        const spy = jest.spyOn(jwt, 'decode').mockReturnValueOnce(true);

        const result = isAdmin(token);

        expect(spy).toHaveBeenCalled();


    })
})
