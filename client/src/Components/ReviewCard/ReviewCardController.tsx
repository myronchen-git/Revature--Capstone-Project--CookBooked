import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from '../Util/constants'; 

import { RootState } from "../../store/store";
import { Review } from "../../types/types";
import ReviewCardView from "./ReviewCardView";

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
  const username: string = useSelector((state: RootState) => state.user.username);
  const authToken: string = useSelector((state: RootState) => state.user.token);
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    "https://test-image-bucket-rev.s3.us-west-1.amazonaws.com/default.webp"
  );

  useEffect(getProfilePictureUrl, []);

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
      .delete(`${serverUrl}/reviews/recipe/${review.recipeId}/review/${review.reviewId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        removeReviewHandler(review.reviewId);
      })
      .catch((err) => {});
  }

  /**
   * Fetches the profile picture.
   */
  function getProfilePictureUrl(): void {
    console.log(`Getting profile picture URL for user ${review.author}.`);

    axios
      .get(`${serverUrl}/accounts/${review.author}`)
      .then((response) => {
        console.log("response.data = " + JSON.stringify(response.data));
        setProfilePictureUrl(response.data?.imageUrl || "");
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

  return (
    <ReviewCardView
      review={review}
      reviewContent={generateReviewContentString(review, shortVersion)}
      shortVersion={shortVersion}
      displayDelete={review.author === username}
      onDelete={deleteReview}
      profilePictureUrl={profilePictureUrl}
    />
  );
}

// ==================================================

export default ReviewCardController;
