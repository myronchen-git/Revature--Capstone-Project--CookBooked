const commentService = require("../../src/service/CommentsService");
const commentDao = require('../../src/repository/CommentsDAO');

describe("Test for GetCommentsByReviewId", () => {
    //test success for the return of the function
    test("Test Succeeds and Returns a List of Comments", async () => {
        const testInput = "1";
        const expectedReturn = [
            {
                reviewId: "1",
                commentId: "1"
            },
            {
                reviewId: "1",
                commentId: "2"
            },
            {
                reviewId: "1",
                commentId: "3"
            }
        ];

        const daoSpy = jest.spyOn(commentDao, "getCommentsByReviewId").mockReturnValueOnce(expectedReturn);

        const result = await commentService.getCommentsByReviewId(testInput);

        expect(daoSpy).toHaveBeenCalled();
        expect(result).toStrictEqual(expectedReturn);
    })

    //test error if the return value is an empty array
    test("Test Throws an Error if Item list is empty", async () => {
        const testInput = "1";
        const expectedReturn = [];

        jest.spyOn(commentDao, "getCommentsByReviewId").mockReturnValueOnce(expectedReturn);

        expect(async() => await commentService.getCommentsByReviewId(testInput)).rejects.toThrow();
    })

    //test error if the DAO fails
    test("Test Throws an Error if the DAO fails", async () => {
        const testInput = "1";

        const expectedReturn = new Error("Test Error");

        jest.spyOn(commentDao, "getCommentsByReviewId").mockRejectedValueOnce(expectedReturn);

        expect(async() => await commentService.getCommentsByReviewId(testInput)).rejects.toThrow();
    })
})