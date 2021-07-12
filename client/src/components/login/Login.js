import React, { useState } from 'react';
import './Login.css';
import GoogleLog from './google/GoogleLog'
import UsernameLogin from './usernameLogin/UsernameLogin'


export default function Login({ setLoggedIn, socket, setUserName, userName, room, setRoom, connectedUsers, setConnectedUsers, googleDetails, setGoogleDetails }) {

  const[googleLogScreen, setGoogleLogScreen] = useState(true)

  const toggle = () => {
    setGoogleLogScreen(googleLogScreen => !googleLogScreen);
  }

  const google = (
    <GoogleLog 
      googleLogScreen={googleLogScreen}
      setGoogleLogScreen={setGoogleLogScreen}
      toggle={toggle}
      googleDetails={googleDetails}
      setGoogleDetails={setGoogleDetails}
      setLoggedIn={setLoggedIn}
      connectedUsers={connectedUsers}
      setConnectedUsers={setConnectedUsers}
    />
  )

  const usernameLogin = (
    <UsernameLogin 
      userName={userName}
      setUserName={setUserName}
      room={room}
      setRoom={setRoom}
      setLoggedIn={setLoggedIn}
      socket={socket}
      toggle={toggle}
    />
  )

  return (
    <div className="login">
      {googleLogScreen ? google : usernameLogin}
    </div>
  )
}
