const {
  sanitizeGetReviewsQueryParams,
  convertUuid,
} = require("../../src/controller/ReviewsRouterHelpers");
const ArgumentError = require("../../src/errors/ArgumentError");

// --------------------------------------------------

const UUID = "3e2ce0cf-19fe-4f0c-a9e8-072eddad00b2";
const RECIPE_ID = "83724"; // only recipe ID and author needs to be different from start key
const AUTHOR = "user1";
const CREATED_AT = 909090;
const EXCLUSIVE_START_KEY_FOR_BASE_TABLE = { recipeId: "77777", reviewId: UUID };
const EXCLUSIVE_START_KEY_FOR_AUTHOR_GSI = {
  ...EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
  author: "user99",
  createdAt: CREATED_AT,
};
const EXCLUSIVE_START_KEY_FOR_CREATEDAT_GSI = {
  ...EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
  createdAt: CREATED_AT,
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

  test("Giving no query parameters should return an empty Object.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {};
    const EXPECTED_RESULT = {};

    // Act
    const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

    // Assert
    expect(RESULT).toStrictEqual(EXPECTED_RESULT);
  });

  test("Giving an ExclusiveStartKey without a recipeId should throw an error.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {
      ExclusiveStartKey: JSON.stringify({ reviewId: UUID }),
    };

    // Act
    function runFunc() {
      sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);
    }

    // Assert
    expect(runFunc).toThrow(ArgumentError);
  });

  test("Giving an ExclusiveStartKey without a valid reviewId should throw an error.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {
      ExclusiveStartKey: JSON.stringify({ recipeId: "77777", reviewId: "8399" }),
    };

    // Act
    function runFunc() {
      sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);
    }

    // Assert
    expect(runFunc).toThrow(ArgumentError);
  });

  test(
    "Giving an ExclusiveStartKey with recipe ID, review ID, and createdAt " +
      "should return an Object with recipe ID, review ID, and createdAt.",
    () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        ExclusiveStartKey: JSON.stringify({
          ...EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
          createdAt: CREATED_AT,
        }),
      };
      const EXPECTED_RESULT = {
        ExclusiveStartKey: EXCLUSIVE_START_KEY_FOR_CREATEDAT_GSI,
      };

      // Act
      const RESULT = sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);

      // Assert
      expect(RESULT).toStrictEqual(EXPECTED_RESULT);
    }
  );

  test("Giving an ExclusiveStartKey with recipe ID, review ID, and author should throw an error.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {
      ExclusiveStartKey: JSON.stringify({
        ...EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
        author: "user99",
      }),
    };

    // Act
    function runFunc() {
      sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);
    }

    // Assert
    expect(runFunc).toThrow(ArgumentError);
  });

  test(
    "Giving an ExclusiveStartKey with recipe ID, review ID, author, " +
      "but with invalid createdAt should throw an error.",
    () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        ExclusiveStartKey: JSON.stringify({
          ...EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
          author: "user99",
          createdAt: "abcd",
        }),
      };

      // Act
      function runFunc() {
        sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);
      }

      // Assert
      expect(runFunc).toThrow(ArgumentError);
    }
  );

  test(
    "Giving an ExclusiveStartKey with recipe ID, review ID, but with " +
      "invalid createdAt should throw an error.",
    () => {
      // Arrange
      const REQUEST_QUERY_PARAMS = {
        ExclusiveStartKey: JSON.stringify({
          ...EXCLUSIVE_START_KEY_FOR_BASE_TABLE,
          createdAt: "abcd",
        }),
      };

      // Act
      function runFunc() {
        sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);
      }

      // Assert
      expect(runFunc).toThrow(ArgumentError);
    }
  );

  test("Giving an unparsable ExclusiveStartKey should throw an error.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {
      ExclusiveStartKey: "{ recipeId }",
    };

    // Act
    function runFunc() {
      sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);
    }

    // Assert
    expect(runFunc).toThrow(ArgumentError);
  });

  test("Giving an invalid Limit should throw an error.", () => {
    // Arrange
    const REQUEST_QUERY_PARAMS = {
      Limit: "abc",
    };

    // Act
    function runFunc() {
      sanitizeGetReviewsQueryParams(REQUEST_QUERY_PARAMS);
    }

    // Assert
    expect(runFunc).toThrow(ArgumentError);
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

  test("Giving an invalid UUID throws an error.", () => {
    // Arrange
    const UUID = "1234567890";

    // Act
    function runFunc() {
      convertUuid(UUID);
    }

    // Assert
    expect(runFunc).toThrow(ArgumentError);
  });
});
