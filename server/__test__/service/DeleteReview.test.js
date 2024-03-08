const { deleteReview } = require("../../src/service/ReviewsService");
const reviewDao = require("../../src/repository/ReviewsDAO");
const ArgumentError = require("../../src/errors/ArgumentError");

describe("Test Delete Review", () => {
    //test for success of the deleteReview Function
    test("Test Success for deleteReview", async () => {
        const inputData = { reviewId: "2", recipeId: "1" };
        
        const daoSpy = jest.spyOn(reviewDao, "deleteReviewById").mockReturnValueOnce(inputData);

        const result = await deleteReview(inputData);

        expect(result).toBe(inputData);
        expect(daoSpy).toHaveBeenCalled();
        expect(daoSpy).toHaveBeenCalledWith(inputData);
    })

    //test to see if there is no recipeId entered
    test("Test Fail if no RecipeId Given", () => {
        const inputData = {reviewId: "1"};

        expect(async () => await deleteReview(inputData)).rejects.toThrow(ArgumentError);
    })  

    //test to see if the DAO fails
    test("Test for DAO Error", () => {
        const inputData = { reviewId: "2", recipeId: "1" };

        const err = new Error('Test Error');

        const daoSpy = jest.spyOn(reviewDao, 'deleteReviewById').mockRejectedValueOnce(err);

        expect(deleteReview(inputData)).rejects.toThrow();
        expect(daoSpy).toHaveBeenCalled();
    })
})