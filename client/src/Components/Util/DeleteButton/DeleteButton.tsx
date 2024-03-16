import React from "react";
import trash from "../../../icons/trash.svg";

import "./DeleteButton.css";

// ==================================================

function DeleteButton({ onClick: clickHandler }: { onClick: any }) {
  return <img className="delete-button" src={trash} alt="Delete" onClick={clickHandler} />;
}

// ==================================================

export default DeleteButton;
