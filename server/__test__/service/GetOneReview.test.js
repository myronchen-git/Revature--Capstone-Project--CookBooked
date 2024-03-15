const { getOneReview } = require("../../src/service/ReviewsService");
const reviewDao = require("../../src/repository/ReviewsDAO");
const ArgumentError = require("../../src/errors/ArgumentError");

describe("Test getOneReview", () => {
    //test success for this function
    test("Test Success", async () => {
        const inputData = {
            reviewId : "1",
            recipeId: "1"
        }

        const expected = {
            reviewId : "1",
            recipeId: "1"
        }

        const clone = structuredClone(expected);

        const spy = jest.spyOn(reviewDao, "getOneReviewById").mockReturnValueOnce(clone);

        const result = await getOneReview(inputData);

        expect(spy).toBeCalled();
        expect(result).toEqual(expected);
    })

    //test fail on empty inputs
    test("Test Fail empty ReviewId or RecipeId", async () => {
        const noReviewId = {
            recipeId: "1"
        }

        const noRecipeId = {
            reviewId : "1"
        }
        
        const emptyObject = {}

        expect(async () => await getOneReview(noReviewId)).rejects.toThrow(ArgumentError);
        expect(async () => await getOneReview(noRecipeId)).rejects.toThrow(ArgumentError);
        expect(async () => await getOneReview(emptyObject)).rejects.toThrow(ArgumentError);
    })

    //test fail if the GetCommand returns undefined
    test("Test Fail: No review found", async () => {
        const inputData = {
            recipeId: "1",
            reviewId : "1"
        }

        const spy = jest.spyOn(reviewDao, "getOneReviewById").mockReturnValueOnce(undefined);

        expect(async () => await getOneReview(inputData)).rejects.toThrow();
        expect(spy).toBeCalled();
    })

    //test fail in the DAO
    test("Test fail in the DAO", async () => {
        const inputData = {
            reviewId : "1",
            recipeId: "1"
        }

        const err = new Error('Test Error');
        const spy = jest.spyOn(reviewDao, "getOneReviewById").mockRejectedValueOnce(err);

        expect(async () => await getOneReview(inputData)).rejects.toThrow();
        expect(spy).toBeCalled();
    })
})