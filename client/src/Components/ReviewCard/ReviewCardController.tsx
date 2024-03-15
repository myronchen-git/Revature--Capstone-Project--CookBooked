import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "../../store/store";
import { Review } from "../../types/types";
import ReviewCardView from "./ReviewCardView";

// --------------------------------------------------

const serverBaseUrl = "http://localhost:4000";

// ==================================================

/**
 * Contains the logic for generating a review card component.
 *
 * @param param0 {review, shortVersion, onRemoveReview}
 * {Review} review: the Review Object to display and is received from the API endpoints and database.
 * {boolean} shortVersion: true if using this component as a small card to be attached to a main component,
 * which also links to the related review's webpage; false to display the full content of the review and for use in
 * the related review's webpage.
 * {Function} onRemoveReview: a callback function for if this review is deleted.
 * @returns JSX component for the whole review card, containing the logic and display code.
 */
function ReviewCardController({
  review,
  shortVersion,
  onRemoveReview: removeReviewHandler,
}: {
  review: Review;
  shortVersion: boolean;
  onRemoveReview: any;
}) {
  const username = useSelector((state: RootState) => state.user.username);
  const authToken = useSelector((state: RootState) => state.user.token);

  /**
   * Creates the shortened or full length version of the review content.
   *
   * @param review the Review Object to get the content from.
   * @param shortVersion true if the content should be shortened.
   * @returns the review content String.
   */
  function generateReviewContentString(review: Review, shortVersion: boolean) {
    const MAX_CONTENT_LENGTH = 200;

    if (shortVersion && review.content.length > MAX_CONTENT_LENGTH) {
      return review.content.substring(0, MAX_CONTENT_LENGTH - 3) + "...";
    }

    return review.content;
  }

  /**
   * Deletes the review that this component belongs to.
   */
  function deleteReview() {
    console.log(`Deleting review ${review.reviewId} by ${review.author}.`);

    axios
      .delete(`${serverBaseUrl}/reviews/recipe/${review.recipeId}/review/${review.reviewId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        removeReviewHandler(review.reviewId);
      })
      .catch((err) => {});
  }

  return (
    <ReviewCardView
      review={review}
      reviewContent={generateReviewContentString(review, shortVersion)}
      shortVersion={shortVersion}
      displayDelete={review.author === username}
      onDelete={deleteReview}
    />
  );
}

// ==================================================

export default ReviewCardController;
