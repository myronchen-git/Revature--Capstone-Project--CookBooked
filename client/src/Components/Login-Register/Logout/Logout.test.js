import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import Logout from "./Logout";

describe('Logout tests', () => {
    const mockStore = configureStore([]);

    afterEach(() => {
        jest.resetAllMocks();
      });
    
    test('renders logout button', () => {
        const initialState = {
            username: "test_username",
            password: "password123"
        }
        const store = mockStore(initialState);

        const { getByText } = render(
            <Provider store={store}>
                <Logout />
            </Provider>
        );
        
        const logoutButton = getByText('Logout');

        expect(logoutButton).toBeInTheDocument();
    })


});
