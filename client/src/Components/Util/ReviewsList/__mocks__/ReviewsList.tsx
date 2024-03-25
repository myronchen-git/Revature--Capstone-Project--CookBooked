import React from "react";
import { Review } from "../../../../types/types";

// ==================================================

function ReviewsList({
  reviews,
  onRemoveReview: removeReviewHandler,
}: {
  reviews: Review[];
  onRemoveReview: any;
}) {
  return (
    <section data-testid="section">
      {reviews.map((review) => {
        return <div onClick={() => removeReviewHandler(review.reviewId)}>{review.reviewId}</div>;
      })}
    </section>
  );
}

// ==================================================

export default ReviewsList;
