import React from "react";
import { useNavigate } from "react-router-dom";

import { Review, Comment } from "../../types/types";
import ReviewCardController from "../ReviewCard/ReviewCardController";
import CommentCardController from "../CommentCard/CommentCardController";
import PostComment from "../PostComment/PostComment";

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
    <>
      <header>
        {Object.keys(review).length !== 0 && (
          <ReviewCardController
            review={review}
            shortVersion={false}
            onRemoveReview={() => navigate("/")}
          />
        )}
      </header>
      <main>
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
    </>
  );
}

// ==================================================

export default ReviewPageView;
