import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "../../store/store";
import { Comment } from "../../types/types";
import CommentCardView from "./CommentCardView";

// --------------------------------------------------

const serverBaseUrl = "http://localhost:4000";

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
  const username = useSelector((state: RootState) => state.user.username);
  const authToken = useSelector((state: RootState) => state.user.token);
  const [displayDeleteError, setDisplayDeleteError] = useState(false);

  /**
   * Deletes the comment that this component belongs to.
   */
  function deleteComment() {
    console.log(`Deleting comment ${comment.commentId} by ${comment.author}.`);

    axios
      .delete(
        `${serverBaseUrl}/comments/review/${comment.reviewId}/comments/${comment.commentId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((response) => {
        removeCommentHandler(comment.commentId);
        setDisplayDeleteError(false);
      })
      .catch((err) => {
        setDisplayDeleteError(true);
      });
  }

  return (
    <CommentCardView
      comment={comment}
      displayDelete={comment.author === username}
      onDelete={deleteComment}
      displayDeleteError={displayDeleteError}
    />
  );
}

// ==================================================

export default CommentCardController;
