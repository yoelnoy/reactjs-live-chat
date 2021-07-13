import React, { useState, useEffect } from 'react';
import './Chat.css';
import SidePannel from '../sidePannel/SidePannel'
import ChatHeader from '../chatHeader/ChatHeader'
import ChatKeyborad from '../chatKeyboard/ChatKeyborad'
import ChatMessages from '../chatMessages/ChatMessages'
import ChooseRoom from './chooseRoom/ChooseRoom'


export default function Chat({ socket, room, setRoom, userImg, userName, setUserName, connectedUsers, setLoggedIn, googleDetails }) {

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [roomChosen, serRoomChosen] = useState(false)
  
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList(prev =>[...prev, data]);
    });
  }, [socket]);

  const chooseRoom = (
    <ChooseRoom 
      setRoom={setRoom}
      setLoggedIn={setLoggedIn}
      socket={socket}
      room={room}
      userName={userName}
      userImg={userImg}
      setUserName={setUserName} 
      serRoomChosen={serRoomChosen} 
    />
  )

  const chatHeader = (
    <ChatHeader 
      userName = {userName}
      room = {room}
      socket = {socket}
      setLoggedIn = {setLoggedIn}
      googleDetails = {googleDetails}
    />
  )

  const chatKeyborad = (
    <ChatKeyborad 
      message = {message}
      setMessage = {setMessage}
      socket = {socket}
      room = {room}
      userName = {userName}
      messageList = {messageList}
      setMessageList = {setMessageList}
      googleDetails = {googleDetails}
    />
  )

  const chatMessages = (
    <ChatMessages 
      userName = {userName}
      messageList = {messageList}
      room = {room}
    />
  )

  const chat = (
    <div className="chat__window">
      <SidePannel socket={socket} connectedUsers={connectedUsers} />
      <div className="chatContainer">
        {chatHeader}
        {chatMessages}
        {chatKeyborad}
      </div>
    </div>
  )

  return (
    <div>
      {roomChosen ? chat : chooseRoom}
    </div>
  )
}
