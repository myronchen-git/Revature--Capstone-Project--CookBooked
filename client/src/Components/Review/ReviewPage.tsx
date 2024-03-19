import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from '../Util/constants'; 

import { Review, Comment } from "../../types/types";
import ReviewPageView from "./ReviewPageView";

// ==================================================

/**
 * Creates the webpage for a specific review.
 */
function ReviewPage() {
  const { recipeId, reviewId } = useParams();
  const [review, setReview] = useState({} as Review);
  const [commentsData, setCommentsData] = useState([] as Comment[]);

  useEffect(() => {
    fetchReview();
    fetchComments();
  }, []);

  // ----------

  /**
   * Retrieves the review that is associated with this webpage and URL.
   */
  function fetchReview() {
    console.log(`Fetching review ${reviewId}.`);

    axios
      .get(`${serverUrl}/reviews/recipe/${recipeId}/review/${reviewId}`)
      .then((response) => {
        setReview(response.data?.ReviewPost);
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
   * Retrieves comments for the associated review.
   */
  function fetchComments() {
    console.log(`Fetching comments for review ${reviewId}.`);

    axios
      .get(`${serverUrl}/comments/review/${reviewId}/comments`)
      .then((response) => {
        setCommentsData(response.data?.CommentPost);
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
   * Removes a comment from the commentsData state.
   *
   * @param commentId the comment ID belonging to the comment to remove.
   */
  function removeCommentHandler(commentId: string) {
    console.log(`Removing comment ${commentId}.`);

    const currentCommentsData = [...commentsData];

    const index = currentCommentsData.findIndex((comment) => {
      return comment.commentId === commentId;
    });

    currentCommentsData.splice(index, 1);
    setCommentsData(currentCommentsData);
  }

  function addCommentHandler(comment: Comment) {
    console.log(`Adding comment ${comment.commentId} to display list.`);

    const currentCommentsData = [...commentsData];
    currentCommentsData.unshift(comment);
    setCommentsData(currentCommentsData);
  }

  // ----------

  return (
    <ReviewPageView
      review={review}
      commentsData={commentsData}
      onRemoveComment={removeCommentHandler}
      onAddComment={addCommentHandler}
    />
  );
}

// ==================================================

export default ReviewPage;
