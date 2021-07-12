import React, { useState, useEffect } from 'react'
import './SidePannel.css';
import SidePannelUser from '../sidePannelUser/SidePannelUser'


export default function SidePannel({ connectedUsers, socket }) {

  const [typing, setTyping] = useState(false)
  const [userYyping, setUserTyping] = useState('') 

  useEffect(() => {
    socket.on("typing", (data) => {
      setTyping(data.state)
      setUserTyping(data.id)
    })
  }, [socket])

  return (
    <div className="sidePannelContainer">
      <div className="sidePannelTitle">Connected Users</div>
      {connectedUsers.map((u, index) => {
        return (
          <div key={index}>
            <SidePannelUser key={u.id} u={u} typing={typing} userYyping={userYyping} />
          </div>
        )
      })}
    </div>
  )
}
