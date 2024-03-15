import React from "react";
import { Link } from "react-router-dom";

import { Review } from "../../types/types";
import DeleteButton from "../Util/DeleteButton/DeleteButton";
import "./ReviewCard.css";

// ==================================================

/**
 * The view component for a review.
 *
 * @param param0 {review, reviewContent, shortVersion, onDelete}
 * {Review} review: the Review Object to display and is received from the API endpoints and database.
 * {string} reviewContent: the review content in String format to be placed into the ReviewCardView component.
 * {boolean} shortVersion: true if using this component as a small card to be attached to a main component,
 * which also links to the related review's webpage; false to display the full content of the review and for use in
 * the related review's webpage.
 * {boolean} displayDelete: true to display the delete button.
 * {Function} onDelete: a function for deleting this review.
 * @returns JSX component for viewing the review.
 */
function ReviewCardView({
  review,
  reviewContent,
  shortVersion,
  displayDelete = false,
  onDelete: deleteHandler,
}: {
  review: Review;
  reviewContent: string;
  shortVersion: boolean;
  displayDelete: boolean;
  onDelete: any;
}) {
  return (
    <article className="review-card">
      <img className="review-card__image" src={review.imageUrl} alt={review.recipeName} />
      <div className="review-card__main">
        <div className="review-card__header">
          <div>
            <p>{review.recipeName}</p>
            <p>rating: {review.rating}</p> {/* placeholder */}
          </div>
          <div>
            <Link to={`/profile/${review.author}`}>
              <b>{review.author}</b>
              <img className="profile__picture" src="" alt="Profile Picture" /> {/* TODO */}
            </Link>
          </div>
        </div>
        <div className="review-card__body">
          {shortVersion ? (
            <Link to={`/recipe/${review.recipeId}/review/${review.reviewId}`}>
              <span className="review-card__content">{reviewContent}</span>
            </Link>
          ) : (
            <p>{reviewContent}</p>
          )}
        </div>
        <div className="review-card__footer">
          <div>{new Date(review.createdAt).toLocaleString()}</div>
          <div>{displayDelete && <DeleteButton onClick={deleteHandler} />}</div>
        </div>
      </div>
    </article>
  );
}

// ==================================================

export default ReviewCardView;
