import { render } from '@testing-library/react';
import LoginContainer from './LoginContainer';
import LoginInput from './LoginInput';

test('renders login fields and submit button', () => {

    const { getByPlaceholderText, getByText } = render(<LoginInput />);

    const usernameInputElement = getByPlaceholderText('username');
    const passwordInputElement = getByPlaceholderText('password');
    const submitButton = getByText('Submit');

    expect(usernameInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
})

