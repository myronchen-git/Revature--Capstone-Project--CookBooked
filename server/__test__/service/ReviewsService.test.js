const { getReviews } = require("../../src/service/ReviewsService");
const ReviewsDAO = require("../../src/repository/ReviewsDAO");

// --------------------------------------------------

const RECIPE_ID1 = "1234";
const RECIPE_ID2 = "2345";
const REVIEW_ID1 = "987";
const REVIEW_ID2 = "654";
const AUTHOR1 = "author1";
const AUTHOR2 = "author2";
const CREATED_AT1 = 3333;
const LIMIT = 20;
const MAX_LIMIT = 50;

// ==================================================

describe("getReviews", () => {
  let getReviewsSpy;

  beforeEach(() => {
    getReviewsSpy = jest.spyOn(ReviewsDAO, "getReviews");
  });

  describe("Querying base table", () => {
    test(
      "When given a recipe ID property, this should call the " +
        "DAO's getReviews and return a list of reviews.",
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

        getReviewsSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

        // Act
        const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

        // Assert
        expect(RESULT).toEqual(EXPECTED_RESULT);
        expect(getReviewsSpy).toHaveBeenCalledTimes(1);
        expect(getReviewsSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
      }
    );

    test(
      "When given recipe ID, ExclusiveStartKey, and Limit, this should call the " +
        "DAO's getReviews with the correct properties and return a list of reviews.",
      async () => {
        // Arrange
        const REQUEST_QUERY_PARAMS = {
          recipeId: RECIPE_ID1,
          ExclusiveStartKey: { recipeId: RECIPE_ID1, reviewId: REVIEW_ID1, createdAt: CREATED_AT1 },
          Limit: LIMIT,
        };
        const EXPECTED_PASSED_PROPS = structuredClone(REQUEST_QUERY_PARAMS);
        const EXPECTED_RESULT = {
          items: [{ recipeId: RECIPE_ID1, reviewId: REVIEW_ID2, author: AUTHOR2 }],
          LastEvaluatedKey: {},
        };

        getReviewsSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

        // Act
        const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

        // Assert
        expect(RESULT).toEqual(EXPECTED_RESULT);
        expect(getReviewsSpy).toHaveBeenCalledTimes(1);
        expect(getReviewsSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
      }
    );

    test(
      "Giving recipe ID and ExclusiveStartKey, but ExclusiveStartKey has extra properties, should not pass the " +
        "extra properties to the DAO.",
      async () => {
        // Arrange
        const REQUEST_QUERY_PARAMS = {
          recipeId: RECIPE_ID1,
          ExclusiveStartKey: {
            recipeId: RECIPE_ID1,
            reviewId: REVIEW_ID1,
            author: AUTHOR1,
            createdAt: CREATED_AT1,
          },
        };
        const EXPECTED_PASSED_PROPS = {
          recipeId: RECIPE_ID1,
          ExclusiveStartKey: {
            recipeId: RECIPE_ID1,
            reviewId: REVIEW_ID1,
            createdAt: CREATED_AT1,
          },
          Limit: MAX_LIMIT,
        };
        const EXPECTED_RESULT = {
          items: [{ recipeId: RECIPE_ID1, reviewId: REVIEW_ID2, author: AUTHOR2 }],
          LastEvaluatedKey: {},
        };

        getReviewsSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

        // Act
        const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

        // Assert
        expect(RESULT).toEqual(EXPECTED_RESULT);
        expect(getReviewsSpy).toHaveBeenCalledTimes(1);
        expect(getReviewsSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
      }
    );

    test("Giving multiple properties should have getting reviews default to getting by recipe ID.", async () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        recipeId: RECIPE_ID1,
        author: AUTHOR1,
        ExclusiveStartKey: {
          recipeId: RECIPE_ID1,
          reviewId: REVIEW_ID1,
          author: AUTHOR1,
          createdAt: CREATED_AT1,
        },
      };
      const EXPECTED_PASSED_PROPS = {
        recipeId: RECIPE_ID1,
        ExclusiveStartKey: {
          recipeId: RECIPE_ID1,
          reviewId: REVIEW_ID1,
          createdAt: CREATED_AT1,
        },
        Limit: MAX_LIMIT,
      };
      const EXPECTED_RESULT = {
        items: [{ recipeId: RECIPE_ID1, reviewId: REVIEW_ID1, author: AUTHOR1 }],
        LastEvaluatedKey: {},
      };

      getReviewsSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

      // Act
      const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

      // Assert
      expect(RESULT).toEqual(EXPECTED_RESULT);
      expect(getReviewsSpy).toHaveBeenCalledTimes(1);
      expect(getReviewsSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
    });
  });

  describe("Querying author-createdAt-index table", () => {
    test(
      "When given an author property, this should call the " +
        "DAO's getReviewsByAuthor and return a list of reviews.",
      async () => {
        // Arrange
        const REQUEST_QUERY_PARAMS = { author: AUTHOR1 };
        const EXPECTED_PASSED_PROPS = { ...REQUEST_QUERY_PARAMS, Limit: MAX_LIMIT };
        const EXPECTED_RESULT = {
          items: [
            { recipeId: RECIPE_ID1, reviewId: REVIEW_ID1, author: AUTHOR1 },
            { recipeId: RECIPE_ID2, reviewId: REVIEW_ID1, author: AUTHOR1 },
          ],
          LastEvaluatedKey: {},
        };

        getReviewsSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

        // Act
        const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

        // Assert
        expect(RESULT).toEqual(EXPECTED_RESULT);
        expect(getReviewsSpy).toHaveBeenCalledTimes(1);
        expect(getReviewsSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
      }
    );

    test(
      "When given author, ExclusiveStartKey, and Limit, this should call the " +
        "DAO's getReviews with the correct properties and return a list of reviews.",
      async () => {
        // Arrange
        const REQUEST_QUERY_PARAMS = {
          author: AUTHOR1,
          ExclusiveStartKey: {
            recipeId: RECIPE_ID1,
            reviewId: REVIEW_ID1,
            author: AUTHOR1,
            createdAt: CREATED_AT1,
          },
          Limit: LIMIT,
        };
        const EXPECTED_PASSED_PROPS = structuredClone(REQUEST_QUERY_PARAMS);
        const EXPECTED_RESULT = {
          items: [{ recipeId: RECIPE_ID1, reviewId: REVIEW_ID2, author: AUTHOR1 }],
          LastEvaluatedKey: {},
        };

        getReviewsSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

        // Act
        const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

        // Assert
        expect(RESULT).toEqual(EXPECTED_RESULT);
        expect(getReviewsSpy).toHaveBeenCalledTimes(1);
        expect(getReviewsSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
      }
    );

    test(
      "Giving author and ExclusiveStartKey, but ExclusiveStartKey has too few properties, should not pass the " +
        "ExclusiveStartKey to the DAO.",
      async () => {
        // Arrange
        const REQUEST_QUERY_PARAMS = {
          author: AUTHOR1,
          ExclusiveStartKey: {
            author: AUTHOR1,
            createdAt: CREATED_AT1,
          },
        };
        const EXPECTED_PASSED_PROPS = {
          author: AUTHOR1,
          Limit: MAX_LIMIT,
        };
        const EXPECTED_RESULT = {
          items: [{ recipeId: RECIPE_ID1, reviewId: REVIEW_ID2, author: AUTHOR2 }],
          LastEvaluatedKey: {},
        };

        getReviewsSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

        // Act
        const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

        // Assert
        expect(RESULT).toEqual(EXPECTED_RESULT);
        expect(getReviewsSpy).toHaveBeenCalledTimes(1);
        expect(getReviewsSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
      }
    );
  });

  describe("Querying isRecent-createdAt-index table", () => {
    test(
      "Not giving any query parameters should call the DAO's getReviews with only the Limit argument, " +
        "and return a list of reviews.",
      async () => {
        // Arrange
        const REQUEST_QUERY_PARAMS = {};
        const EXPECTED_PASSED_PROPS = {
          Limit: MAX_LIMIT,
        };
        const EXPECTED_RESULT = {
          items: [{ recipeId: RECIPE_ID1, reviewId: REVIEW_ID2, author: AUTHOR2 }],
          LastEvaluatedKey: {},
        };

        getReviewsSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

        // Act
        const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

        // Assert
        expect(RESULT).toEqual(EXPECTED_RESULT);
        expect(getReviewsSpy).toHaveBeenCalledTimes(1);
        expect(getReviewsSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
      }
    );

    test(
      "Only giving ExclusiveStartKey and Limit should call the DAO's getReviews with the correct " +
        "properties and return a list of reviews.",
      async () => {
        // Arrange
        const REQUEST_QUERY_PARAMS = {
          ExclusiveStartKey: {
            recipeId: RECIPE_ID1,
            reviewId: REVIEW_ID1,
            createdAt: CREATED_AT1,
          },
          Limit: LIMIT,
        };
        const EXPECTED_PASSED_PROPS = {
          ExclusiveStartKey: {
            recipeId: RECIPE_ID1,
            reviewId: REVIEW_ID1,
            isRecent: 1,
            createdAt: CREATED_AT1,
          },
          Limit: LIMIT,
        };
        const EXPECTED_RESULT = {
          items: [{ recipeId: RECIPE_ID1, reviewId: REVIEW_ID2, author: AUTHOR1 }],
          LastEvaluatedKey: {},
        };

        getReviewsSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

        // Act
        const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

        // Assert
        expect(RESULT).toEqual(EXPECTED_RESULT);
        expect(getReviewsSpy).toHaveBeenCalledTimes(1);
        expect(getReviewsSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
      }
    );

    test(
      "Only giving ExclusiveStartKey, but ExclusiveStartKey has too few properties, " +
        "should not pass ExclusiveStartKey to the DAO.",
      async () => {
        // Arrange
        const REQUEST_QUERY_PARAMS = {
          ExclusiveStartKey: {
            recipeId: RECIPE_ID1,
            reviewId: REVIEW_ID1,
          },
        };
        const EXPECTED_PASSED_PROPS = {
          Limit: MAX_LIMIT,
        };
        const EXPECTED_RESULT = {
          items: [{ recipeId: RECIPE_ID1, reviewId: REVIEW_ID2, author: AUTHOR1 }],
          LastEvaluatedKey: {},
        };

        getReviewsSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

        // Act
        const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

        // Assert
        expect(RESULT).toEqual(EXPECTED_RESULT);
        expect(getReviewsSpy).toHaveBeenCalledTimes(1);
        expect(getReviewsSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
      }
    );

    test(
      "Only giving ExclusiveStartKey, but ExclusiveStartKey has too many properties, should not pass the " +
        "extra properties to the DAO.",
      async () => {
        // Arrange
        const REQUEST_QUERY_PARAMS = {
          ExclusiveStartKey: {
            recipeId: RECIPE_ID1,
            reviewId: REVIEW_ID1,
            author: AUTHOR1,
            createdAt: CREATED_AT1,
          },
        };
        const EXPECTED_PASSED_PROPS = {
          ExclusiveStartKey: {
            recipeId: RECIPE_ID1,
            reviewId: REVIEW_ID1,
            isRecent: 1,
            createdAt: CREATED_AT1,
          },
          Limit: MAX_LIMIT,
        };
        const EXPECTED_RESULT = {
          items: [{ recipeId: RECIPE_ID1, reviewId: REVIEW_ID2, author: AUTHOR1 }],
          LastEvaluatedKey: {},
        };

        getReviewsSpy.mockReturnValueOnce(structuredClone(EXPECTED_RESULT));

        // Act
        const RESULT = await getReviews(REQUEST_QUERY_PARAMS);

        // Assert
        expect(RESULT).toEqual(EXPECTED_RESULT);
        expect(getReviewsSpy).toHaveBeenCalledTimes(1);
        expect(getReviewsSpy).toHaveBeenCalledWith(EXPECTED_PASSED_PROPS);
      }
    );
  });

  describe("Testing Limit property", () => {
    test("Giving a Limit of less than 1 should throw an error.", () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = { recipeId: RECIPE_ID1, Limit: 0 };

      // Act
      async function runFunc() {
        await getReviews(REQUEST_QUERY_PARAMS);
      }

      // Assert
      expect(runFunc).rejects.toThrow();
      expect(getReviewsSpy).not.toHaveBeenCalled();
    });

    test("Giving a Limit of more than 50 should throw an error.", () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = { recipeId: RECIPE_ID1, Limit: 101 };

      // Act
      async function runFunc() {
        await getReviews(REQUEST_QUERY_PARAMS);
      }

      // Assert
      expect(runFunc).rejects.toThrow();
      expect(getReviewsSpy).not.toHaveBeenCalled();
    });
  });
});
