import React from "react";
import "./Notification.css";

const errStyle = {
  animationName: "popDown",
  animationDuration: "2.8s",
  animationTimingFunction: "ease-in-out",
};

const Notification = (props) => {
  const { success, message } = props.message;

  if (success && message) {
    return (
      <p style={{ ...errStyle, color: "green" }} className="pop-up">
        {message}
      </p>
    );
  } else if (!success && message) {
    return (
      <p style={{ ...errStyle, color: "red" }} className="pop-up">
        {message}
      </p>
    );
  } else {
    return null;
  }
};

export default Notification;
