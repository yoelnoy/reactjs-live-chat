import React, { useState, useEffect } from 'react';
import './App.css';
import { io } from "socket.io-client";
import Login from './components/login/Login'
import Chat from './components/chat/Chat'
import LoginScreen from './components/login/loginScreen/LoginScreen'

let socket;


function App() {
  //const SOCKET_URL = 'https://reactjs-live-chat.herokuapp.com/';
  const SOCKET_URL = process.env.NODE_ENV === 'production' ? 'https://reactjs-live-chat.herokuapp.com/' : 'http://localhost:5000/';
  console.log(SOCKET_URL);
  console.log(process.env.NODE_ENV);
  const [loggedIn, setLoggedIn] = useState(false); 
  const [room, setRoom] = useState("Public");
  const [userName, setUserName] = useState("");
  const [userImg, setUserImage] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([
    //{room: "Public", userName: "Ariana Grande", userImg: "https://media.resources.festicket.com/www/artists/ArianaGrande.jpg", id: "uShDK7ECMFZnjj7zAAHF"}
  ]);
  const [googleDetails, setGoogleDetails] = useState([]);
  console.log(googleDetails);
  useEffect(() => {
    socket = io(SOCKET_URL);
    socket.on('connect',() => {   
      console.log(`connected with ${socket.id}`);
    });
  }, [SOCKET_URL]);

  useEffect(() => {
      googleDetails.forEach(u => {
        setGoogleDetails(googleDetails)
        setUserName(u.name)
        setUserImage(u.imageUrl)
      });
    
  })

  useEffect(() => {
    socket.on("connected_users", (data) => {
      setConnectedUsers(data)
    })
  }, [connectedUsers])

  useEffect(() => {
    socket.on("updated-users", (data) => {
      setConnectedUsers(data)
    })
  }, [connectedUsers])

  const login = (
    <Login 
      setLoggedIn={setLoggedIn} 
      socket={socket} 
      setUserName={setUserName} 
      userName={userName} 
      connectedUsers={connectedUsers} 
      setConnectedUsers={setConnectedUsers} 
      room={room} 
      setRoom={setRoom} 
      googleDetails={googleDetails} 
      setGoogleDetails={setGoogleDetails} 
    />
  )

  const chat = (
    <Chat 
      googleDetails={googleDetails} 
      setLoggedIn={setLoggedIn} 
      socket={socket} 
      room={room} 
      userName={userName}
      userImg={userImg} 
      connectedUsers={connectedUsers}
      ////
      setRoom={setRoom}
      setUserName={setUserName}
    />
  )


  return (
    <div className="App">
      {loggedIn ? chat : login}      
      {/* <LoginScreen />       */}
    </div>
  );
}

export default App;
