import { render, getByText, fireEvent } from "@testing-library/react";
import PostComment from "./PostComment";
import ConfigureStore from 'redux-mock-store';
import { Provider } from "react-redux";

const mockStore = ConfigureStore([]);

describe("Test PostComment Component", () => {
    test("Elements of the Component", () => {
        const stateOfStore = {
            user: {
                username: "test_user",
                token: "test"
            }
        }

        const store = mockStore(stateOfStore);

        const { getByText, getByRole } = render(
            <Provider store={store}>
                <PostComment />
            </Provider>
        );

        const openBtn = getByText("Post a Comment");

        expect(openBtn).toBeInTheDocument();

        fireEvent.click(openBtn);

        //all the contents inside the form
        const closeBtn = getByText("Close");
        const textarea = getByRole("textbox");
        const submitBtn = getByText("Submit Comment");

        expect(closeBtn).toBeInTheDocument();
        expect(textarea).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();
    })
})