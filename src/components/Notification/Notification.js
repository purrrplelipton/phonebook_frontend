import React from "react";
import "./Notification.css";

const falseMessage = {
  backgroundColor: "white",
  borderColor: "red",
  color: "red",
  animationName: "popDown",
  animationDuration: "3s",
  animationTimingFunction: "ease-in-out",
};

const trueMessage = {
  backgroundColor: "white",
  borderColor: "green",
  color: "green",
  animationName: "popDown",
  animationDuration: "3s",
  animationTimingFunction: "ease-in-out",
};

const Notification = (props) => {
  const { success, message } = props.message;

  if (success && message) {
    return (
      <p style={trueMessage} className="pop-up">
        {message}
      </p>
    );
  } else if (!success && message) {
    return (
      <p style={falseMessage} className="pop-up">
        {message}
      </p>
    );
  } else {
    return null;
  }
};

export default Notification;
