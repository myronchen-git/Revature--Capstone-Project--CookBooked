const dotenv = require("dotenv");
const path = require("path");

// Get the path to the .env file
const envPath = path.resolve(__dirname, "../../.env");

// Config the .env file
dotenv.config({ path: envPath });

const {
  buildQueryParamsForGetReviewsByRecipeId,
} = require("../../src/repository/ReviewsDAOHelpers");

// --------------------------------------------------

const RECIPE_ID = "1234";
const REVIEW_ID = "5678";
const LIMIT = 10;
const REVIEWS_TABLE_NAME = process.env.REVIEWS_TABLE_NAME;

// ==================================================

describe("buildQueryParamsForGetReviewsByRecipeId", () => {
  test("Giving only recipe ID should return a Query Command parameter object with bare minimum properties.", () => {
    const PROPS = { recipeId: RECIPE_ID };
    const EXPECTED_RESULT = {
      TableName: REVIEWS_TABLE_NAME,
      KeyConditionExpression: "recipeId = :recipeId",
      ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
    };

    const RESULT = buildQueryParamsForGetReviewsByRecipeId(PROPS);

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
        TableName: REVIEWS_TABLE_NAME,
        ExclusiveStartKey: { recipeId: RECIPE_ID, reviewId: REVIEW_ID },
        KeyConditionExpression: "recipeId = :recipeId",
        ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
      };

      const RESULT = buildQueryParamsForGetReviewsByRecipeId(PROPS);

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
        TableName: REVIEWS_TABLE_NAME,
        KeyConditionExpression: "recipeId = :recipeId",
        ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
        Limit: LIMIT,
      };

      const RESULT = buildQueryParamsForGetReviewsByRecipeId(PROPS);

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
        TableName: REVIEWS_TABLE_NAME,
        ExclusiveStartKey: { recipeId: RECIPE_ID, reviewId: REVIEW_ID },
        KeyConditionExpression: "recipeId = :recipeId",
        ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
        Limit: LIMIT,
      };

      const RESULT = buildQueryParamsForGetReviewsByRecipeId(PROPS);

      expect(RESULT).toStrictEqual(EXPECTED_RESULT);
    }
  );
});
