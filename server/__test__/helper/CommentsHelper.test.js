const commentsHelper = require('../../src/controller/CommentsHelper');
const reviewHelper = require('../../src/controller/ReviewsHelper');

describe('Test CommentsHelper', () => {
    //constants to use in the tests
    const REVIEW_ID = "1";
    const USERNAME = "John";
    const CONTENT = "Test Constant";

    //test success of the commentHelper
    test("Test success of the commentHelper", () => {
        const testSuccess = {
            reviewId: REVIEW_ID,
            username: USERNAME,
            content: CONTENT
        }

        jest.spyOn(reviewHelper, "isString").mockReturnValueOnce(REVIEW_ID);
        jest.spyOn(reviewHelper, "isString").mockReturnValueOnce(CONTENT);

        const result = commentsHelper.validateNewComment(testSuccess);

        expect(result).toStrictEqual(testSuccess);
    })

    //test fail if any fields are is missing
    test("Test fails if any of the fields are missing", () => {
        const testFailNoReview = {
            reviewId: "",
            username: USERNAME,
            content: CONTENT
        }

        const testFailNoUN = {
            reviewId: REVIEW_ID,
            username: "",
            content: CONTENT
        }

        const testFailNoContent = {
            reviewId: REVIEW_ID,
            username: USERNAME,
            content: ""
        }

        expect(() => commentsHelper.validateNewComment(testFailNoReview)).toThrow("Invalid request to the server");
        expect(() => commentsHelper.validateNewComment(testFailNoUN)).toThrow("Invalid request to the server");
        expect(() => commentsHelper.validateNewComment(testFailNoContent)).toThrow("Invalid request to the server");
    })
})