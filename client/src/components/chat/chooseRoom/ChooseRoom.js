import React, { useEffect } from 'react';
import './ChooseRoom.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { AiOutlineLogout } from 'react-icons/ai';

export default function ChooseRoom({ setRoom, setLoggedIn, socket, room, userName, userImg, serRoomChosen }) {

  // Connecting to room specified by the user or default "Public" upon clicking
  const connectToRoom = () => {
    setLoggedIn(true);
    serRoomChosen(true)
    socket.emit("join_room", {room: room, userName: userName, userImg: userImg, id: socket.id});
  };

  //Submitting with Enter key
  useEffect((event) => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        connectToRoom(event)
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <div className="chooseRoom_container">
      <div className="chooseRoom__background"></div>
      <div className="chooseRoom__content">
        <AiOutlineLogout className="chooseRoom__backButton" />
        <div className="inputs">
          <TextField 
            className="inputs_textField"
            id="outlined-basic" 
            label="Choose a room or enter public chat" 
            variant="outlined" 
            size="medium" 
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
        </div>
        <Button variant="contained" size="large" color="primary" onClick={connectToRoom}>Enter Chat</Button>
      </div>
    </div>
  )
}
