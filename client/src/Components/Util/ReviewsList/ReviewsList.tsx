import React from "react";

import { Review } from "../../../types/types";
import ReviewCardController from "../../ReviewCard/ReviewCardController";

// ==================================================

/**
 * A component for displaying a list of reviews.
 *
 * @param param0 {reviews, onRemoveReview}
 * {Review[]} reviews: the list of reviews to display.
 * {Function} onRemoveReview: a callback function for if a review is deleted.
 * @returns JSX component of a section element that contains a list of reviews.
 */
function ReviewsList({
  reviews,
  onRemoveReview: removeReviewHandler,
}: {
  reviews: Review[];
  onRemoveReview: any;
}) {
  return (
    <section>
      {reviews.map((review) => {
        return (
          <ReviewCardController
            key={review.reviewId}
            review={review}
            shortVersion={true}
            onRemoveReview={removeReviewHandler}
          />
        );
      })}
    </section>
  );
}

// ==================================================

export default ReviewsList;
