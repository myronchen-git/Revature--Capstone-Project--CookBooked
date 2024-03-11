const dotenv = require("dotenv");
const path = require("path");

// Get the path to the .env file
const envPath = path.resolve("./.env");

// Config the .env file
dotenv.config({ path: envPath });

const { buildQueryParamsForGetReviews } = require("../../src/repository/ReviewsDAOHelpers");

// --------------------------------------------------

const RECIPE_ID = "1234";
const REVIEW_ID = "5678";
const AUTHOR = "author";
const LIMIT = 10;
const REVIEWS_TABLENAME = process.env.REVIEWS_TABLENAME;
const AUTHOR_INDEX_NAME = process.env.REVIEWS_TABLE_AUTHOR_INDEXNAME;

// ==================================================

describe("buildQueryParamsForGetReviews", () => {
  test("Giving only recipe ID should return a Query Command parameter object with bare minimum properties.", () => {
    const PROPS = { recipeId: RECIPE_ID };
    const EXPECTED_RESULT = {
      TableName: REVIEWS_TABLENAME,
      KeyConditionExpression: "recipeId = :recipeId",
      ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
    };

    const RESULT = buildQueryParamsForGetReviews(PROPS);

    expect(RESULT).toStrictEqual(EXPECTED_RESULT);
  });

  test(
    "Giving recipe ID and ExclusiveStartKey should return a Query Command parameter object that " +
      "includes ExclusiveStartKey.",
    () => {
      const PROPS = {
        recipeId: RECIPE_ID,
        ExclusiveStartKey: { recipeId: RECIPE_ID, reviewId: REVIEW_ID },
      };
      const EXPECTED_RESULT = {
        TableName: REVIEWS_TABLENAME,
        ExclusiveStartKey: { recipeId: RECIPE_ID, reviewId: REVIEW_ID },
        KeyConditionExpression: "recipeId = :recipeId",
        ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
      };

      const RESULT = buildQueryParamsForGetReviews(PROPS);

      expect(RESULT).toStrictEqual(EXPECTED_RESULT);
    }
  );

  test(
    "Giving recipe ID and Limit should return a Query Command parameter object that " +
      "includes Limit.",
    () => {
      const PROPS = {
        recipeId: RECIPE_ID,
        Limit: LIMIT,
      };
      const EXPECTED_RESULT = {
        TableName: REVIEWS_TABLENAME,
        KeyConditionExpression: "recipeId = :recipeId",
        ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
        Limit: LIMIT,
      };

      const RESULT = buildQueryParamsForGetReviews(PROPS);

      expect(RESULT).toStrictEqual(EXPECTED_RESULT);
    }
  );

  test(
    "Giving recipe ID, ExclusiveStartKey, and Limit should return a Query Command parameter object that " +
      "includes ExclusiveStartKey and Limit.",
    () => {
      const PROPS = {
        recipeId: RECIPE_ID,
        ExclusiveStartKey: { recipeId: RECIPE_ID, reviewId: REVIEW_ID },
        Limit: LIMIT,
      };
      const EXPECTED_RESULT = {
        TableName: REVIEWS_TABLENAME,
        ExclusiveStartKey: { recipeId: RECIPE_ID, reviewId: REVIEW_ID },
        KeyConditionExpression: "recipeId = :recipeId",
        ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
        Limit: LIMIT,
      };

      const RESULT = buildQueryParamsForGetReviews(PROPS);

      expect(RESULT).toStrictEqual(EXPECTED_RESULT);
    }
  );

  test("Giving only author should return a Query Command parameter object with bare minimum properties.", () => {
    const PROPS = {
      author: AUTHOR,
    };
    const EXPECTED_RESULT = {
      TableName: REVIEWS_TABLENAME,
      IndexName: AUTHOR_INDEX_NAME,
      KeyConditionExpression: "author = :author",
      ExpressionAttributeValues: { ":author": AUTHOR },
      ScanIndexForward: false,
    };

    const RESULT = buildQueryParamsForGetReviews(PROPS);

    expect(RESULT).toStrictEqual(EXPECTED_RESULT);
  });
});
