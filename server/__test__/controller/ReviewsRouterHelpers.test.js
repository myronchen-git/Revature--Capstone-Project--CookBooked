const {
  sanitizeGetReviewsQueryParams,
  convertUuid,
} = require("../../src/controller/ReviewsRouterHelpers");

// --------------------------------------------------

const UUID = "3e2ce0cf-19fe-4f0c-a9e8-072eddad00b2";
const RECIPE_ID = "83724";
const AUTHOR = "user1";
const EXCLUSIVE_START_KEY_FOR_BASE_TABLE = { recipeId: "77777", reviewId: UUID };
const EXCLUSIVE_START_KEY_FOR_AUTHOR_GSI = {
  ...EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
  author: "user99",
  createdAt: 773829,
};
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
        ExclusiveStartKey: JSON.stringify(EXCLUSIVE_START_KEY_FOR_BASE_TABLE),
        Limit: String(LIMIT),
      };
      const EXPECTED_RESULT = {
        recipeId: RECIPE_ID,
        ExclusiveStartKey: EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
        Limit: LIMIT,
      };

      // Act
      const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

      // Assert
      expect(RESULT).toStrictEqual(EXPECTED_RESULT);
    }
  );

  test(
    "Giving a valid author, ExclusiveStartKey, and Limit " +
      "should return an Object containing those values.",
    () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        author: AUTHOR,
        ExclusiveStartKey: JSON.stringify(EXCLUSIVE_START_KEY_FOR_AUTHOR_GSI),
        Limit: String(LIMIT),
      };
      const EXPECTED_RESULT = {
        author: AUTHOR,
        ExclusiveStartKey: EXCLUSIVE_START_KEY_FOR_AUTHOR_GSI,
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

  test("Giving only author should return an Object containing only that.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {
      author: AUTHOR,
    };
    const EXPECTED_RESULT = {
      author: AUTHOR,
    };

    // Act
    const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

    // Assert
    expect(RESULT).toStrictEqual(EXPECTED_RESULT);
  });

  test("Giving only ExclusiveStartKey should return an Object containing only that.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {
      ExclusiveStartKey: JSON.stringify(EXCLUSIVE_START_KEY_FOR_BASE_TABLE),
    };
    const EXPECTED_RESULT = {
      ExclusiveStartKey: EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
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

  test(
    "Giving an ExclusiveStartKey with recipe ID and review ID but without an author " +
      "should return an Object with only recipe ID and review ID.",
    () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        ExclusiveStartKey: JSON.stringify({
          ...EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
          createdAt: 773829,
        }),
      };
      const EXPECTED_RESULT = {
        ExclusiveStartKey: EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
      };

      // Act
      const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

      // Assert
      expect(RESULT).toStrictEqual(EXPECTED_RESULT);
    }
  );

  test(
    "Giving an ExclusiveStartKey with recipe ID and review ID but without createdAt " +
      "should return an Object with only recipe ID and review ID.",
    () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        ExclusiveStartKey: JSON.stringify({
          ...EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
          author: "user99",
        }),
      };
      const EXPECTED_RESULT = {
        ExclusiveStartKey: EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
      };

      // Act
      const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

      // Assert
      expect(RESULT).toStrictEqual(EXPECTED_RESULT);
    }
  );

  test(
    "Giving an ExclusiveStartKey with recipe ID, review ID, author, but with invalid createdAt " +
      "should return an Object with only recipe ID and review ID.",
    () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        ExclusiveStartKey: JSON.stringify({
          ...EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
          author: "user99",
          createdAt: "abcd",
        }),
      };
      const EXPECTED_RESULT = {
        ExclusiveStartKey: EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
      };

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
