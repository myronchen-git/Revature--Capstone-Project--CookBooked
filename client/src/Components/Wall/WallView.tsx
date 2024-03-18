import React from "react";

import { Review } from "../../types/types";
import ReviewsList from "../Util/ReviewsList/ReviewsList";
import "./Wall.css";

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
      <header className="wall-header">
        <h1 className="app-title">CookBooked</h1>
      </header>
      <main>
        <h2 className="recent-reviews-title">Recent Reviews</h2>
        <div className="container-xl">
          <div className="row justify-content-center justify-content-xl-start">
            <div className="col-10">
              <ReviewsList reviews={reviews} onRemoveReview={removeReviewHandler} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// ==================================================

export default WallView;
