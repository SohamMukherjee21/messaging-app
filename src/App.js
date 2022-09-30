import "./App.css";
import { useEffect, useState } from "react";
import { FormControl, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import FlipMove from "react-flip-move";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import React from "react";
function App() {
  const [input, setInput] = useState("");
  // const [messages, setMessages] = useState(["Hello", "Hi", "How are you?"]);57:00
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    // const name = prompt("Please enter your name");
    setUsername(prompt("Please enter your name"));
    //This will give a popup to enter your name if the users browser has support for it
  }, []);

  const sendMessage = (event) => {
    //all the logic of sending message goes here
    event.preventDefault();
    // setMessages([...messages, input]);1:00:00 => Since each message is now an object with username and text property, we now need to set each message as an object with username from prompt and text should be the input that we type in
    // setMessages([...messages, { username: username, message: input }]);1:41:00
    //Spreading the messages array and adding the input to it, we are adding input bcz we don't want to lose the previous messages rather we want to add the new message to the previous messages
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <div className="nav">
        <img
          src="https://logos-world.net/wp-content/uploads/2021/02/Facebook-Messenger-Logo.png"
          alt=""
          className="logo"
        />
        <h2>Welcome {username}</h2>
      </div>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            {" "}
            <SendIcon />{" "}
          </IconButton>
        </FormControl>
        {/* input field for sending messages */}
        {/* Button for sending messages */}
        {/* Wrapping input and button inside a form and making the button type as submit so that when we click on the button it will submit the form and the page will not refresh and also make the enter key work as the button 28:50*/}
      </form>
      {/* messages themselves will be displayed by looping through the messages array */}
      <FlipMove className="random">
        {messages.map(({ id, message }) => (
          <Message
            key={id}
            username={username}
            message={message}
            messageDetails={messages}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
/*
1.{messages.map((message) => (
         <Message username={message.username} text={message.text} />1:12:15

         We need to separate the users text from any random persons text on the app, users text should be on the right side and random persons text should be on the left side as in usual messaging apps, so we need to check if username of the message is equal to the username of the person who is logged in, if it is then we need to display the message on the right side and if it is not then we need to display the message on the left side and for that we will have to change the props passed to the Message component and take the username as a prop which is the username entered by the logged in user and another prop will be the message object as a whole which contains username and message of every person who types anything in the app 
         REMEMBER the message could be from an user which is not the logged in user
         <Message username={username} message={message} />
         ))}
2.FlipMove basically renders our messages in a nice way
*/
