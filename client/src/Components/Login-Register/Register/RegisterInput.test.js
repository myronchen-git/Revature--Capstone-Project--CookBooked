import { render } from "@testing-library/react";
import RegisterInput from "./RegisterInput";

describe('registerInput Tests', () => {

    afterEach(() => {
        jest.resetAllMocks();
      });

      test('Component displays all fields correctly', () => {
        const createUser = jest.fn()
        const { getByPlaceholderText, getByText } = render(<RegisterInput createUser={createUser}/>);

        const usernameInput = getByPlaceholderText('username');
        const passwordInput = getByPlaceholderText('password');
        const submitButton = getByText('Submit');

        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
      })

})
