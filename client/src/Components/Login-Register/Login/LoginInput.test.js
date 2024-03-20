import LoginInput from "./LoginInput";
import { render } from "@testing-library/react";


describe('loginInput tests', () => {

    afterEach(() => {
        jest.resetAllMocks();
      });
    
    test('renders input fields', () => {
        const updateUser = jest.fn()
        const { getByPlaceholder } = render(<LoginInput updateUser={updateUser}/>);

        const usernameInput = getByPlaceholder('username');
        const passwordInput = getByPlaceholder('password');

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    })


});
