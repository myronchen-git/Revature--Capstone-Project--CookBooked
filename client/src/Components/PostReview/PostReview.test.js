import { render, getByText, fireEvent, getByTestId } from "@testing-library/react";
import PostReview from "./PostReview";
import ConfigureStore from 'redux-mock-store';
import { Provider } from "react-redux";

const mockStore = ConfigureStore([]);

jest.mock("../ImageUploader/UploadImageInput", () => () => <div data-testid="UploadImage"></div>)

describe("Test PostReview Component", () => {
    test("Elements of the Component", () => {
        const stateOfStore = {
            user: {
                username: "test_user",
                token: "test"
            }
        }

        const store = mockStore(stateOfStore);

        const { getByText, getByRole, getByTestId } = render(
            <Provider store={store}>
                <PostReview />
            </Provider>
        );

        const openBtn = getByText("Post a Review");

        expect(openBtn).toBeInTheDocument();

        fireEvent.click(openBtn);

        //all the contents inside the form
        const closeBtn = getByText("Close");
        const textarea = getByRole("textbox");
        const oneStar = getByText("1 Star");
        const twoStar = getByText("2 Star");
        const threeStar = getByText("3 Star");
        const fourStar = getByText("4 Star");
        const fiveStar = getByText("5 Star");
        const uploadImg = getByTestId("UploadImage")
        const submitBtn = getByText("Submit Review");

        expect(closeBtn).toBeInTheDocument();
        expect(textarea).toBeInTheDocument();
        expect(oneStar).toBeInTheDocument();
        expect(twoStar).toBeInTheDocument();
        expect(threeStar).toBeInTheDocument();
        expect(fourStar).toBeInTheDocument();
        expect(fiveStar).toBeInTheDocument();
        expect(uploadImg).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();
    })
})