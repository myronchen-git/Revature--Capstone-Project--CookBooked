import React from "react";

import { Review } from "../../types/types";
import ReviewsList from "../Util/ReviewsList/ReviewsList";
import ReviewCardController from "../ReviewCard/ReviewCardController";

// ==================================================

/**
 * The view component for the home (wall) webpage.
 *
 * @param param0 {reviews, onRemoveReview}
 * {Review[]} reviews: the list of recent reviews to display on the home webpage.
 * {Function} onRemoveReview: a callback function for if a review is deleted.
 * @returns JSX component for displaying the home (wall) webpage.
 */
function WallView({
  reviews,
  onRemoveReview: removeReviewHandler,
}: {
  reviews: Review[];
  onRemoveReview: any;
}) {
  return (
    <>
      <header>
        <h1>CookBooked</h1>
      </header>
      <main>
        <h2>Recent Reviews</h2>
        <ReviewsList reviews={reviews} onRemoveReview={removeReviewHandler} />
      </main>
    </>
  );
}

// ==================================================

export default WallView;
