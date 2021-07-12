import React, { useEffect } from 'react';
import './UsernameLogin.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { IoIosArrowBack } from 'react-icons/io';

export default function UsernameLogin({ setUserName, setRoom, userName, setLoggedIn, socket, room, toggle }) {

  useEffect(() => {
    let username = userName.charAt(0).toUpperCase() + userName.slice(1);
    setUserName(username);
  })

  // Connecting to room specified by the user or default "Public" upon clicking
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", {room: room, userName: userName, id: socket.id});
    //console.log(room + userName + socket.id);
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
    <div className="logIn_container">
      <div className="usernameLogin__background"></div>
      <div className="usernameLogin__content">
        <IoIosArrowBack className="usernameLogin__backButton" onClick={toggle}></IoIosArrowBack>
        <div className="inputs">
          <TextField 
            className="inputs_textField"
            id="outlined-basic" 
            label="Username" 
            variant="outlined" 
            size="medium" 
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
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
