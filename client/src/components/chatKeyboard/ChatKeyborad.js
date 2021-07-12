import React, { useState, useEffect, useRef } from 'react';
import './ChatKeyborad.css'
import Button from '@material-ui/core/Button';
import Picker from 'emoji-picker-react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

export default function ChatKeyborad({ message, setMessage, socket, room, userName, messageList, setMessageList, googleDetails }) {

  const [timeStamp, setTimeStamp] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState([]);
  const [userGoogleDetails, setUserGoogleDetails] = useState([]);
  const toggle = () => setIsOpen(!isOpen);
  const inputMessageRef = useRef();

  // Looping the google object
  useEffect(() => {
    googleDetails.forEach(u => {
      setUserGoogleDetails(u)
    });
  }, [googleDetails])

  // Setting timestamp on load
  useEffect(() => {
    msgTimeStamp()
  }, [])

  // Focusing on the text input on load
  useEffect(() => {
    inputMessageRef.current.focus();
  });

  // Timestamp function
  const msgTimeStamp = () => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    if (m < 10) {
      m = "0" + m;
    }
    let hour = h + ':' + m ;
    setTimeStamp(hour)
    return hour
  }

  // sending a message function
  const sendMessage = (event) => {
    if(message !== ""){
      msgTimeStamp()
      let messageContent = {
      room: room,
      content: {
        id: socket.id,
        author: userName,
        message: message,
        timeStamp: timeStamp,
        img: userGoogleDetails.imageUrl
        }
        // Content sent when user didnt login with google
      /* content: {
        id: socket.id,
        author: {userName},
        message: message,
        timeStamp: timeStamp
        } */
      };

      socket.emit("send_message", messageContent);
      setMessageList([...messageList, messageContent.content]);
      setMessage("");
      setIsOpen(false);
    } 
  };

  // User typing indicator
  useEffect(() => {
    const messageInput = document.getElementById("messageInput"); 
    if (messageInput.value !== "") {
      socket.emit("typing", {state: true, id: socket.id})
    }else {
      socket.emit("typing", {state: false, id: socket.id})
    }
  })

  //Submitting with Enter key
  useEffect((event) => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        sendMessage(event)
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  // When selecting an emoji function
  const onEmojiClick = (event, emojiObject) => {
    const emojiSelected = emojiObject.emoji;
    setChosenEmoji(emojiSelected);
    setMessage(message + emojiSelected);
  };

  // Emoji button of the keyboard
  const emojiButton = (
    <div className="emoji">
      <InsertEmoticonIcon  
        color={isOpen ? 'primary' : 'disabled'} 
        onClick={toggle} />
    </div>
  )

  // Text input of the keyboard
  const inputBox = (
    <input
          ref={inputMessageRef}
          id="messageInput"
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => {setMessage(e.target.value)}}
        />
  )

  // Send button of the keyboard
  const sendButton = (
    <Button
      variant="contained"
      disableElevation 
      //color={message ? 'primary' : 'disabled'}
      onClick={sendMessage}>Send
    </Button>
  )

  // Send button of the keyboard
  const emojiPicker = (
    <div className={isOpen ? 'app_picker_show' : 'app_picker_hide'}>
      <Picker 
        onEmojiClick={onEmojiClick} 
        value={chosenEmoji} 
        onClick={event => setMessage(event.target.value)}/>
    </div>
  )

  return (
    <div className="messageInputs">
      <div className="messageInputs__keyboard">
        {inputBox}
        {emojiButton}
        {sendButton}
      </div>

      {emojiPicker}
    </div>
  )
}
