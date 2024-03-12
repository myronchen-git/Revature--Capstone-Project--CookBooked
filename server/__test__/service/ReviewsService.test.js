const { getReviews } = require("../../src/service/ReviewsService");
const ReviewsDAO = require("../../src/repository/ReviewsDAO");

// --------------------------------------------------

const RECIPE_ID1 = "1234";
const REVIEW_ID1 = "987";
const REVIEW_ID2 = "654";
const AUTHOR1 = "author1";
const AUTHOR2 = "author2";
const MAX_LIMIT = 100;

// ==================================================

describe("getReviews", () => {
  let getReviewsByRecipeIdSpy;

  beforeEach(() => {
    getReviewsByRecipeIdSpy = jest.spyOn(ReviewsDAO, "getReviewsByRecipeId");
  });

  test(
    "When given a recipe ID property, this should call the " +
      "DAO's getReviewsByRecipeId and return a list of reviews.",
    async () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = { recipeId: RECIPE_ID1 };
      const EXPECTED_PASSED_PROPS = { ...REQUEST_QUERY_PARAMS, Limit: MAX_LIMIT };
      const EXPECTED_RESULT = {
        items: [
          { recipeId: RECIPE_ID1, reviewId: REVIEW_ID1, author: AUTHOR1 },
          { recipeId: RECIPE_ID1, reviewId: REVIEW_ID2, author: AUTHOR2 },
        ],
        LastEvaluatedKey: {},
      };

      getReviewsByRecipeIdSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

      // Act
      const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

      // Assert
      expect(RESULT).toEqual(EXPECTED_RESULT);
      expect(getReviewsByRecipeIdSpy).toHaveBeenCalledTimes(1);
      expect(getReviewsByRecipeIdSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
    }
  );

  test(
    "When given recipe ID, ExclusiveStartKey, and Limit, this should call the " +
      "DAO's getReviewsByRecipeId with the correct properties and return a list of reviews.",
    async () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        recipeId: RECIPE_ID1,
        ExclusiveStartKey: { recipeId: RECIPE_ID1, reviewId: REVIEW_ID1 },
        Limit: 20,
      };
      const EXPECTED_PASSED_PROPS = structuredClone(REQUEST_QUERY_PARAMS);
      const EXPECTED_RESULT = {
        items: [{ recipeId: RECIPE_ID1, reviewId: REVIEW_ID2, author: AUTHOR2 }],
        LastEvaluatedKey: {},
      };

      getReviewsByRecipeIdSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

      // Act
      const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

      // Assert
      expect(RESULT).toEqual(EXPECTED_RESULT);
      expect(getReviewsByRecipeIdSpy).toHaveBeenCalledTimes(1);
      expect(getReviewsByRecipeIdSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
    }
  );

  test("Giving a Limit of less than 1 should throw an error.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = { recipeId: RECIPE_ID1, Limit: 0 };

    // Act
    async function runFunc() {
      await getReviews(REQUEST_QUERY_PARAMS);
    }

    // Assert
    expect(runFunc).rejects.toThrow();
    expect(getReviewsByRecipeIdSpy).not.toHaveBeenCalled();
  });

  test("Giving a Limit of more than 100 should throw an error.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = { recipeId: RECIPE_ID1, Limit: 101 };

    // Act
    async function runFunc() {
      await getReviews(REQUEST_QUERY_PARAMS);
    }

    // Assert
    expect(runFunc).rejects.toThrow();
    expect(getReviewsByRecipeIdSpy).not.toHaveBeenCalled();
  });

  // This test is temporary, until there are GET requests for reviews using the author or createdAt attributes.
  test("When not given a recipe ID property, this should throw an error.", async () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {};

    // Act
    async function runFunc() {
      await getReviews(REQUEST_QUERY_PARAMS);
    }

    // Assert
    expect(runFunc).rejects.toThrow();
    expect(getReviewsByRecipeIdSpy).not.toHaveBeenCalled();
  });
});
