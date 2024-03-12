const { logger } = require("../util/logger");
const express = require("express");
const router = express.Router();
const reviewsService = require("../service/ReviewsService");
const { validationMiddleware } = require("./ReviewsHelper");
const { authenticateToken } = require("../util/WebToken");
const ReviewsRouterHelpers = require("./ReviewsRouterHelpers");
const CookBookedError = require("../errors/CookBookedError");

// ==================================================

// CREATE
// New Review Post
router.post("/", authenticateToken, validationMiddleware, async (req, res) => {
  //either throws an error or returns the review it stores
  try {
    const data = await reviewsService.createNewReview(req.body);
    res.status(201).json({
      message: "Created Review Successfully",
      ReviewPost: data,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error Trying This Request`,
      error_message: err.message,
    });
  }
});

// READ
// Retrieves reviews.  URL can contain query parameters recipeId, author, ExclusiveStartKey, or Limit.
router.get("/", async (req, res) => {
  try {
    logger.info(`ReviewsRouter -> GET /: Start`);

    const SANITIZED_REQ_QUERY_PARAMS = ReviewsRouterHelpers.sanitizeGetReviewsQueryParams(
      req.query
    );
    const REVIEWS_DATA = await reviewsService.getReviews(SANITIZED_REQ_QUERY_PARAMS);

    res.status(200).json({ message: `Reviews successfully retrieved.`, ReviewPosts: REVIEWS_DATA });
  } catch (err) {
    if (err instanceof CookBookedError) {
      logger.error(`ReviewsRouter -> /: ${err.message}.`);
      res.status(err.statusCode).json({ message: err.message });
    } else {
      logger.error(`ReviewsRouter -> /: Internal Server Error\n${err}`);
      res.status(500).json({ message: "Server error." });
    }
  }
});

// UPDATE

// DELETE
router.delete("/:reviewId", authenticateToken, async (req, res) => {
  //either throws an error or returns the review deleted review
  try {
    //create a body that combines the recipeId with the reviewId (add username and isAdmin as well)
    const body = req.body;
    body.reviewId = req.params.reviewId;
    body.username = req.user.username;
    body.isAdmin = req.user.isAdmin;
    const data = await reviewsService.deleteReview(body);
    res.status(200).json({
      message: "Deleted Review Successfully",
      ReviewPost: data,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error Trying This Request`,
      error_message: err.message,
    });
  }
});

// ==================================================

module.exports = router;
