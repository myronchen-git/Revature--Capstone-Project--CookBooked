import LoginInput from "./LoginInput";
import { render } from "@testing-library/react";

describe('loginInput tests', () => {

    afterEach(() => {
        jest.resetAllMocks();
      });
    
    test('renders input fields', () => {
        const updateUser = jest.fn()
        const { getByPlaceholderText, getByText } = render(<LoginInput updateUser={updateUser}/>);

        const usernameInput = getByPlaceholderText('username');
        const passwordInput = getByPlaceholderText('password');
        const submitButton = getByText('Submit');

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    })


});
