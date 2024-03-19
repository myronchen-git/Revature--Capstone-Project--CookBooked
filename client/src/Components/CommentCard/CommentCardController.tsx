import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../Util/constants";

import { RootState } from "../../store/store";
import { Comment } from "../../types/types";
import CommentCardView from "./CommentCardView";

// ==================================================

/**
 * Contains the logic portion of the comment card.
 *
 * @param param0 {comment, onRemoveComment}
 * {Comment} comment: the Comment Object to display, which is retrieved from an API response and is the data for a
 * comment entry in the database.
 * {Function} onRemoveComment: a callback function for if this comment is deleted.
 * @returns JSX component for the whole comment card, containing the logic and display code.
 */
function CommentCardController({
  comment,
  onRemoveComment: removeCommentHandler,
}: {
  comment: Comment;
  onRemoveComment: any;
}) {
  const username: string = useSelector((state: RootState) => state.user.username);
  const authToken: string = useSelector((state: RootState) => state.user.token);
  const [displayDeleteError, setDisplayDeleteError] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    "https://test-image-bucket-rev.s3.us-west-1.amazonaws.com/default.webp"
  );

  useEffect(getProfilePictureUrl, []);

  /**
   * Deletes the comment that this component belongs to.
   */
  function deleteComment() {
    console.log(`Deleting comment ${comment.commentId} by ${comment.author}.`);

    axios
      .delete(`${serverUrl}/comments/review/${comment.reviewId}/comments/${comment.commentId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        removeCommentHandler(comment.commentId);
        setDisplayDeleteError(false);
      })
      .catch((err) => {
        setDisplayDeleteError(true);
      });
  }

  /**
   * Fetches the profile picture.
   */
  function getProfilePictureUrl(): void {
    axios
      .get(`${serverUrl}/accounts/${comment.author}`)
      .then((response) => {
        setProfilePictureUrl(response.data?.imageUrl || profilePictureUrl);
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
    <CommentCardView
      comment={comment}
      displayDelete={comment.author === username}
      onDelete={deleteComment}
      displayDeleteError={displayDeleteError}
      profilePictureUrl={profilePictureUrl}
    />
  );
}

// ==================================================

export default CommentCardController;
