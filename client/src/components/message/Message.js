import React from 'react'
import './Message.css'
import { Card, CardContent } from '@material-ui/core';

export default function message({ userName, data }) {
  const isUser = userName === data.author;

  return (
    <div className="message__container">
      <Card 
        style={{
          backgroundColor: "#ff000000",
          border: "none", 
          boxShadow: "none"
        }} 
        className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent className={isUser ? "message__content_user" : "message__content_guest"}>
          <img src={data.img} alt="" className="message__user" />
          <div className={isUser ? "message__messageUser" : "message__messageGuest"}>
            {data.message}
          </div>
          <span className="message_spanTimeStamp">{data.timeStamp}</span>
        </CardContent>
      </Card>
    </div>
  )
}
