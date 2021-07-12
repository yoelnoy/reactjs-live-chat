import React from 'react'
import './ChatHeader.css'
import { AiOutlineLogout } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { RiSettings3Line } from 'react-icons/ri';


export default function ChatHeader({ userName, room, socket, setLoggedIn, googleDetails }) {

  const disconnetUser = () => {
    socket.emit("disconnect-user", socket.id);
    setLoggedIn(false)
    window.location.reload();
  }
  return (
    <div className="chat__header">
      {googleDetails.map((u, index) => {
        return (
          <div key={index} className="chat__header_user">
            <img src={u.imageUrl} alt="" />
            <div>{u.name}</div> 
          </div>
        )
      })}
      
      <div className="chat__header_room">{room}</div>
      <div className="chat__header_utils">
        <BiUser style={{ "fontSize": "1.5rem",  "marginRight": "2%" }} />
        <RiSettings3Line style={{ "fontSize": "1.5rem",  "marginRight": "2%" }} />
        <AiOutlineLogout style={{ "fontSize": "1.5rem" }} onClick={disconnetUser} />
      </div>
    </div>
  )
}
