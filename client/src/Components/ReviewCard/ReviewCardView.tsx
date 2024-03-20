import React from "react";
import { Link } from "react-router-dom";

import { Review } from "../../types/types";
import DeleteButton from "../Util/DeleteButton/DeleteButton";
import ProfilePicture from "../Profile/ProfileHeader/ProfilePicture";
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
 * {string} profilePictureUrl: URL for the review author's profile picture.
 * @returns JSX component for viewing the review.
 */
function ReviewCardView({
  review,
  reviewContent,
  shortVersion,
  displayDelete = false,
  onDelete: deleteHandler,
  profilePictureUrl,
}: {
  review: Review;
  reviewContent: string;
  shortVersion: boolean;
  displayDelete: boolean;
  onDelete: any;
  profilePictureUrl: string;
}) {
  return (
    <article className="review-card container-fluid">
      <div className="row">
        <div className="col-12 col-xl-4">
          <img className="review-card__image" src={review.imageUrl} alt={review.recipeName} />
        </div>
        <div className="review-card__main col-12 col-xl-8 container-fluid">
          <div className="review-card__header row">
            <div className="review-card__header__review-info col">
              <h3 className="review-card__recipe-name">
                <Link to={`/recipe/${review.recipeId}`}>{review.recipeName}</Link>
              </h3>
              <p>rating: {review.rating}</p> {/* placeholder */}
            </div>
            <div className="review-card__profile col">
              <Link to={`/profile/${review.author}`}>
                <b>{review.author}</b>
                <ProfilePicture className="profile__picture" imageUrl={profilePictureUrl} />
              </Link>
            </div>
          </div>
          {shortVersion ? (
            <div className="review-card__body--linked row">
              <Link to={`/recipe/${review.recipeId}/review/${review.reviewId}`}>
                <span className="review-card__content">{reviewContent}</span>
              </Link>
            </div>
          ) : (
            <div className="review-card__body--not-linked row">
              <p>{reviewContent}</p>
            </div>
          )}
          <div className="review-card__footer row container-fluid">
            <div className="row">
              <div className="review-card__date col">
                {new Date(review.createdAt).toLocaleString()}
              </div>
              <div className="review-card__delete col">
                {displayDelete && <DeleteButton onClick={deleteHandler} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ==================================================

export default ReviewCardView;
