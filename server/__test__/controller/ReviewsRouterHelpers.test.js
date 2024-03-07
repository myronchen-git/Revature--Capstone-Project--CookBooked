const {
  sanitizeGetReviewsQueryParams,
  convertUuid,
} = require("../../src/controller/ReviewsRouterHelpers");

// --------------------------------------------------

const UUID = "3e2ce0cf-19fe-4f0c-a9e8-072eddad00b2";
const RECIPE_ID = "83724";
const EXCLUSIVE_START_KEY = { recipeId: "77777", reviewId: UUID };
const LIMIT = 30;

// ==================================================

describe("sanitizeGetReviewsQueryParams", () => {
  test(
    "Giving a valid recipeId, ExclusiveStartKey, and Limit " +
      "should return an Object containing those values.",
    () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        recipeId: RECIPE_ID,
        ExclusiveStartKey: JSON.stringify(EXCLUSIVE_START_KEY),
        Limit: String(LIMIT),
      };
      const EXPECTED_RESULT = {
        recipeId: RECIPE_ID,
        ExclusiveStartKey: EXCLUSIVE_START_KEY,
        Limit: LIMIT,
      };

      // Act
      const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

      // Assert
      expect(RESULT).toStrictEqual(EXPECTED_RESULT);
    }
  );

  test("Giving only recipeId should return an Object containing only that.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {
      recipeId: RECIPE_ID,
    };
    const EXPECTED_RESULT = {
      recipeId: RECIPE_ID,
    };

    // Act
    const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

    // Assert
    expect(RESULT).toStrictEqual(EXPECTED_RESULT);
  });

  test("Giving only ExclusiveStartKey should return an Object containing only that.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {
      ExclusiveStartKey: JSON.stringify(EXCLUSIVE_START_KEY),
    };
    const EXPECTED_RESULT = {
      ExclusiveStartKey: EXCLUSIVE_START_KEY,
    };

    // Act
    const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

    // Assert
    expect(RESULT).toStrictEqual(EXPECTED_RESULT);
  });

  test("Giving only Limit should return an Object containing only that.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {
      Limit: String(LIMIT),
    };
    const EXPECTED_RESULT = {
      Limit: LIMIT,
    };

    // Act
    const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

    // Assert
    expect(RESULT).toStrictEqual(EXPECTED_RESULT);
  });

  test(
    "Giving an ExclusiveStartKey without a recipeId " +
      "should return an Object without ExclusiveStartKey.",
    () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        ExclusiveStartKey: JSON.stringify({ reviewId: UUID }),
      };
      const EXPECTED_RESULT = {};

      // Act
      const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

      // Assert
      expect(RESULT).toStrictEqual(EXPECTED_RESULT);
    }
  );

  test(
    "Giving an ExclusiveStartKey without a valid reviewId " +
      "should return an Object without ExclusiveStartKey.",
    () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        ExclusiveStartKey: JSON.stringify({ recipeId: "77777", reviewId: "8399" }),
      };
      const EXPECTED_RESULT = {};

      // Act
      const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

      // Assert
      expect(RESULT).toStrictEqual(EXPECTED_RESULT);
    }
  );

  test("Giving an invalid Limit should return an Object without Limit.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {
      Limit: "abc",
    };
    const EXPECTED_RESULT = {};

    // Act
    const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

    // Assert
    expect(RESULT).toStrictEqual(EXPECTED_RESULT);
  });
});

// --------------------------------------------------

describe("convertUuid", () => {
  test("Giving a valid UUID returns a String UUID.", () => {
    // Arrange

    // Act
    const RESULT = convertUuid(UUID);

    // Assert
    expect(RESULT).toBe(UUID);
  });

  test("Giving an invalid UUID returns null.", () => {
    // Arrange
    const UUID = "1234567890";

    // Act
    const RESULT = convertUuid(UUID);

    // Assert
    expect(RESULT).toBe(null);
  });
});
