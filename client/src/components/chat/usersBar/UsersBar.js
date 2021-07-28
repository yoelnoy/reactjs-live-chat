import React from 'react'
import './UsersBar.css'

export default function UsersBar({ userName, googleDetails }) {

  console.log(userName);
  console.log(googleDetails);
  return (
    <div className="usersBar-container">
      {googleDetails.map(u => (
        <div key={u.googleId} className="usersBar__user">
          <img src={u.imageUrl} alt="" className="usersBar__user-img" />
        </div>
      ))}
    </div>
  )
}

