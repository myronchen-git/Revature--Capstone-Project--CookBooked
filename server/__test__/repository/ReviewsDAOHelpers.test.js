const dotenv = require("dotenv");
const path = require("path");

// Get the path to the .env file
const envPath = path.resolve("./.env");

// Config the .env file
dotenv.config({ path: envPath });

const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
jest.mock("@aws-sdk/lib-dynamodb");

const { commandForGetReviewsFactory } = require("../../src/repository/ReviewsDAOHelpers");

// --------------------------------------------------

const RECIPE_ID = "1234";
const REVIEW_ID = "5678";
const AUTHOR = "author";
const LIMIT = 10;
const REVIEWS_TABLENAME = process.env.REVIEWS_TABLENAME;
const AUTHOR_INDEX_NAME = process.env.REVIEWS_TABLE_AUTHOR_INDEXNAME;
const IS_RECENT_INDEX_NAME = process.env.REVIEWS_TABLE_ISRECENT_INDEXNAME;

const QC = "QueryCommand";

// ==================================================

describe("commandForGetReviewsFactory", () => {
  let mockQueryCommand;

  beforeEach(() => {
    mockQueryCommand = jest.fn(() => ({ type: QC }));
    QueryCommand.mockImplementation(mockQueryCommand);
  });

  test(
    "Giving only recipe ID should return a Query Command object " +
      "that was created with bare minimum properties.",
    () => {
      // Arrange
      const PROPS = { recipeId: RECIPE_ID };
      const EXPECTED_RESULT_OBJECT_TYPE = QC;
      const EXPECTED_COMMAND_ARG = {
        TableName: REVIEWS_TABLENAME,
        KeyConditionExpression: "recipeId = :recipeId",
        ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
      };

      // Act
      const RESULT = commandForGetReviewsFactory(PROPS);

      // Assert
      expect(RESULT.type).toBe(EXPECTED_RESULT_OBJECT_TYPE);
      expect(mockQueryCommand).toHaveBeenCalledTimes(1);
      expect(mockQueryCommand).toHaveBeenCalledWith(EXPECTED_COMMAND_ARG);
    }
  );

  test(
    "Giving recipe ID and ExclusiveStartKey should return a Query Command object " +
      "that was created with ExclusiveStartKey.",
    () => {
      // Arrange
      const PROPS = {
        recipeId: RECIPE_ID,
        ExclusiveStartKey: { recipeId: RECIPE_ID, reviewId: REVIEW_ID },
      };
      const EXPECTED_RESULT_OBJECT_TYPE = QC;
      const EXPECTED_COMMAND_ARG = {
        TableName: REVIEWS_TABLENAME,
        ExclusiveStartKey: { recipeId: RECIPE_ID, reviewId: REVIEW_ID },
        KeyConditionExpression: "recipeId = :recipeId",
        ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
      };

      // Act
      const RESULT = commandForGetReviewsFactory(PROPS);

      // Assert
      expect(RESULT.type).toBe(EXPECTED_RESULT_OBJECT_TYPE);
      expect(mockQueryCommand).toHaveBeenCalledTimes(1);
      expect(mockQueryCommand).toHaveBeenCalledWith(EXPECTED_COMMAND_ARG);
    }
  );

  test("Giving recipe ID and Limit should return a Query Command object that was created with Limit.", () => {
    // Arrange
    const PROPS = {
      recipeId: RECIPE_ID,
      Limit: LIMIT,
    };
    const EXPECTED_RESULT_OBJECT_TYPE = QC;
    const EXPECTED_COMMAND_ARG = {
      TableName: REVIEWS_TABLENAME,
      KeyConditionExpression: "recipeId = :recipeId",
      ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
      Limit: LIMIT,
    };

    // Act
    const RESULT = commandForGetReviewsFactory(PROPS);

    // Assert
    expect(RESULT.type).toBe(EXPECTED_RESULT_OBJECT_TYPE);
    expect(mockQueryCommand).toHaveBeenCalledTimes(1);
    expect(mockQueryCommand).toHaveBeenCalledWith(EXPECTED_COMMAND_ARG);
  });

  test(
    "Giving recipe ID, ExclusiveStartKey, and Limit should return a Query Command object " +
      "that was created with ExclusiveStartKey and Limit.",
    () => {
      // Arrange
      const PROPS = {
        recipeId: RECIPE_ID,
        ExclusiveStartKey: { recipeId: RECIPE_ID, reviewId: REVIEW_ID },
        Limit: LIMIT,
      };
      const EXPECTED_RESULT_OBJECT_TYPE = QC;
      const EXPECTED_COMMAND_ARG = {
        TableName: REVIEWS_TABLENAME,
        ExclusiveStartKey: { recipeId: RECIPE_ID, reviewId: REVIEW_ID },
        KeyConditionExpression: "recipeId = :recipeId",
        ExpressionAttributeValues: { ":recipeId": RECIPE_ID },
        Limit: LIMIT,
      };

      // Act
      const RESULT = commandForGetReviewsFactory(PROPS);

      // Assert
      expect(RESULT.type).toBe(EXPECTED_RESULT_OBJECT_TYPE);
      expect(mockQueryCommand).toHaveBeenCalledTimes(1);
      expect(mockQueryCommand).toHaveBeenCalledWith(EXPECTED_COMMAND_ARG);
    }
  );

  test("Giving only author should return a Query Command object that was created with bare minimum properties.", () => {
    // Arrange
    const PROPS = {
      author: AUTHOR,
    };
    const EXPECTED_RESULT_OBJECT_TYPE = QC;
    const EXPECTED_COMMAND_ARG = {
      TableName: REVIEWS_TABLENAME,
      IndexName: AUTHOR_INDEX_NAME,
      KeyConditionExpression: "author = :author",
      ExpressionAttributeValues: { ":author": AUTHOR },
      ScanIndexForward: false,
    };

    // Act
    const RESULT = commandForGetReviewsFactory(PROPS);

    // Assert
    expect(RESULT.type).toBe(EXPECTED_RESULT_OBJECT_TYPE);
    expect(mockQueryCommand).toHaveBeenCalledTimes(1);
    expect(mockQueryCommand).toHaveBeenCalledWith(EXPECTED_COMMAND_ARG);
  });

  test(
    "Not giving any arguments should return a Query Command object that was created with bare minimum properties " +
      "but for the isRecent-createdAt-index GSI.",
    () => {
      // Arrange
      const PROPS = {};
      const EXPECTED_RESULT_OBJECT_TYPE = QC;
      const EXPECTED_COMMAND_ARG = {
        TableName: REVIEWS_TABLENAME,
        IndexName: IS_RECENT_INDEX_NAME,
        KeyConditionExpression: "isRecent = :isRecent",
        ExpressionAttributeValues: { ":isRecent": 1 },
        ScanIndexForward: false,
      };

      // Act
      const RESULT = commandForGetReviewsFactory(PROPS);

      // Assert
      expect(RESULT.type).toBe(EXPECTED_RESULT_OBJECT_TYPE);
      expect(mockQueryCommand).toHaveBeenCalledTimes(1);
      expect(mockQueryCommand).toHaveBeenCalledWith(EXPECTED_COMMAND_ARG);
    }
  );
});
