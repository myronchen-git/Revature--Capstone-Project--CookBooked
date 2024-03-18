import React from "react";
import { useNavigate } from "react-router-dom";

import { Review, Comment } from "../../types/types";
import ReviewCardController from "../ReviewCard/ReviewCardController";
import CommentCardController from "../CommentCard/CommentCardController";
import PostComment from "../PostComment/PostComment";
import "./ReviewPage.css";

// ==================================================

/**
 * The view component for a review's webpage.
 *
 * @param param0 {review, commentsData}
 * {Review} review: the review to display.
 * {Comment[]} commentsData: the list of comments to display on the review webpage.
 * @returns JSX component for displaying the review webpage.
 */
function ReviewPageView({
  review,
  commentsData,
  onRemoveComment: removeCommentHandler,
  onAddComment: addCommentHandler,
}: {
  review: Review;
  commentsData: Comment[];
  onRemoveComment: any;
  onAddComment: any;
}) {
  const navigate = useNavigate();

  return (
    <div className="container-lg">
      <div className="row">
        <div className="col">
          <header className="review-page__header">
            {Object.keys(review).length !== 0 && (
              <ReviewCardController
                review={review}
                shortVersion={false}
                onRemoveReview={() => navigate("/")}
              />
            )}
          </header>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 col-lg-8">
          <main className="review-page__main">
            <PostComment reviewId={review.reviewId} onAddComment={addCommentHandler} />
            {commentsData.length > 0 &&
              commentsData.map((comment) => {
                return (
                  <CommentCardController
                    key={comment.commentId}
                    comment={comment}
                    onRemoveComment={removeCommentHandler}
                  />
                );
              })}
          </main>
        </div>
      </div>
    </div>
  );
}

// ==================================================

export default ReviewPageView;
