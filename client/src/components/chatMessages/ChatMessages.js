import React, { useState, useEffect, useRef } from 'react';
import './ChatMessages.css'
import Message from '../message/Message'
import ScrollDownButton from '../scrollDownButton/ScrollDownButton'

export default function ChatMessages({ messageList, userName, room }) {
  
  const [scrolling, setScrolling] = useState('');
  const scrollToBottomRef = useRef();

  useEffect(() => {
    scrollToBottomFunc();
  }, [messageList])

  useEffect(() => {
    document.getElementById("chatBodyId").addEventListener('scroll', () => {
        const scrolled = document.getElementById("chatBodyId").scrollTop;
        const scrolled1 = document.getElementById("chatBodyId").scrollHeight;
        setScrolling(scrolled - scrolled1);
    });
    
  }, [])

  const scrollToBottomFunc = () => {
    scrollToBottomRef.current.scrollIntoView({behavior: "smooth"});
  }

  return (
    <div id="chatBodyId" className="messages">
      <div className="welcome-div"><span className="welcome-msg">{`${userName}, welcome to ${room} room`}</span></div>
      
      {messageList.map((msg, index) => {
          return (
            <div key={index} className="msgtest">
              <Message key={index} data={msg} userName={userName} />
            </div>
          );
        })}

      <ScrollDownButton scrollToBottomFunc={scrollToBottomFunc} scrolling={scrolling}/>
      <span ref={scrollToBottomRef}></span>
    </div>
  )
}
