import React from "react";

const Notifications = ({ message, clases }) => {
  if (message === null) {
    return null;
  }
  return <div className={clases}>{message}</div>;
};

export default Notifications;
