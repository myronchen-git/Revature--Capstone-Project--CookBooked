const { deleteReview } = require("../../src/service/ReviewsService");
const reviewDao = require("../../src/repository/ReviewsDAO");
const ArgumentError = require("../../src/errors/ArgumentError");

describe("Test Delete Review", () => {
    //test success of the deleteReview feature
    test("Test Success for User", async ()=> {
        const inputData = {
            username: "Test",
            isAdmin: false,
            recipeId: "1",
            reviewId: "1"
        }

        const expectedComment = {
            author: "Test",
            recipeId: "1",
            reviewId: "1"
        }

        const expectedClone = structuredClone(expectedComment)

        jest.spyOn(reviewDao, "getOneReviewById").mockReturnValueOnce(expectedClone);
        jest.spyOn(reviewDao, "deleteReviewById").mockReturnValueOnce(true);

        const result = await deleteReview(inputData);
        
        expect(result).toEqual(expectedComment);

    })

    //test success for Admin
    test("Test Success for Admin", async () => {
        const inputData = {
            username: "Admin_Test",
            isAdmin: true,
            recipeId: "1",
            reviewId: "1"
        }

        const expectedComment = {
            author: "Test",
            recipeId: "1",
            reviewId: "1"
        }

        const expectedClone = structuredClone(expectedComment)

        jest.spyOn(reviewDao, "getOneReviewById").mockReturnValueOnce(expectedClone);
        jest.spyOn(reviewDao, "deleteReviewById").mockReturnValueOnce(true);

        const result = await deleteReview(inputData);

        expect(result).toEqual(expectedComment);
    })

    //test fail if no recipeId given
    test("Test fail if No recipeId Given", async () => {
        const inputData = {
            username: "Test",
            isAdmin: false,
            reviewId: "1"
        }

        expect(async () => await deleteReview(inputData)).rejects.toThrow(ArgumentError);
    })

    //test if the getOneReviewById returns undefined
    test("Test fail if There is No Comment by that ID", async () => {
        const inputData = {
            username: "Test",
            isAdmin: false,
            recipeId: "1",
            reviewId: "1"
        }

        jest.spyOn(reviewDao, "getOneReviewById").mockReturnValueOnce(undefined);

        expect(async () => await deleteReview(inputData)).rejects.toThrow();
    })

    //test fails if the user is not Admin or not the user for the COmment
    test("Test fail if incorrect user and not Admin", async() => {
        const inputData = {
            username: "Test",
            isAdmin: false,
            recipeId: "1",
            reviewId: "1"
        }

        const expectedComment = {
            author: "Tester",
            recipeId: "1",
            reviewId: "1"
        }

        jest.spyOn(reviewDao, "getOneReviewById").mockReturnValueOnce(expectedComment);

        expect(async () => await deleteReview(inputData)).rejects.toThrow();
    })

    //test fails in the DAO
    test("Test fail in DAO", async() => {
        const inputData = {
            username: "Test",
            isAdmin: false,
            recipeId: "1",
            reviewId: "1"
        }

        const expectedComment = {
            author: "Test",
            recipeId: "1",
            reviewId: "1"
        }

        jest.spyOn(reviewDao, "getOneReviewById").mockReturnValueOnce(expectedComment);

        const err = new Error('Test Error');

        jest.spyOn(reviewDao, 'deleteReviewById').mockRejectedValueOnce(err);

        expect(async () => await deleteReview(inputData)).rejects.toThrow();
    })
})