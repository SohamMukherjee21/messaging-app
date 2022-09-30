import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef, useEffect, useRef } from "react";
import "./Message.css";

const Message = forwardRef(({ username, message, messageDetails }, ref) => {
  const isUser = username === message.username;
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageDetails]);

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography color="white" variant="h6" component="h6">
            {!isUser && `${message.username || "Unknown User"}: `}{" "}
            {message.message}
          </Typography>
        </CardContent>
      </Card>

      <div ref={messageEndRef} />
    </div>
  );
});

export default Message;
