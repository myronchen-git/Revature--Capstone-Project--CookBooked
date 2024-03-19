import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../Util/constants";

import { Review } from "../../types/types";
import WallView from "./WallView";

// ==================================================

/**
 * Creates the home (wall) webpage.  Currently, pagination for more reviews is not implemented, but the LastEvaluatedKey
 * returned from the API is still stored.
 *
 * @returns JSX component for the home (wall) webpage.
 */
function Wall() {
  interface ReviewsData {
    items: Review[];
    LastEvaluatedKey?: {
      isRecent: Number;
      createdAt: Number;
      recipeId: String;
      reviewId: String;
    };
  }

  const [reviewsData, setReviewsData] = useState({} as ReviewsData);

  useEffect(fetchReviews, []);

  // ----------

  /**
   * Retrieves recent reviews.
   */
  function fetchReviews() {
    console.log("Fetching recent reviews.");

    axios
      .get(serverUrl + "/reviews")
      .then((response) => {
        setReviewsData(response.data?.ReviewPosts);
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
        }
        console.log(err.config);
      });
  }

  /**
   * Removes a review from the reviewsData.items state.
   *
   * @param reviewId the review ID belonging to the review to remove.
   */
  function removeReviewHandler(reviewId: string) {
    console.log(`Removing review ${reviewId} from recent reviews list.`);

    const currentReviewsData = { ...reviewsData };
    const currentReviewsList = [...currentReviewsData.items];

    const index = currentReviewsList.findIndex((review) => {
      return review.reviewId === reviewId;
    });

    currentReviewsList.splice(index, 1);
    currentReviewsData.items = currentReviewsList;
    setReviewsData(currentReviewsData);
  }

  // ----------

  return (
    reviewsData.items && (
      <WallView reviews={reviewsData.items} onRemoveReview={removeReviewHandler} />
    )
  );
}

// ==================================================

export default Wall;
