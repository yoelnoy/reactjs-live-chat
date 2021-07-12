import React from 'react'
import "./SidePannelUser.css"
import {RiRadioButtonLine} from 'react-icons/ri'


export default function SidePannelUser({ typing, userYyping, u }) {
//className={typing === true && userYyping === u.id ? "sidePannelUser__card_typing" : "sidePannelUser__card_notTyping"}
  return (
    <div key={u.id}>
      <div className={typing === true && userYyping === u.id ? "sidePannelUser__card_typing" : "sidePannelUser__card_notTyping"}>
        <div className="sidePannelUser__card_content">
          <div className="sidePannelUser__upperDiv">
            <img src={u.userImg} alt="" />
            <span className="sidePannelUser__user">{u.userName}</span>
            <span className="sidePannelUser__icon"><RiRadioButtonLine /></span>
          </div>
          <span className="sidePannelUser__typing"> {typing === true && userYyping === u.id ? " is typing..." : ""} </span>
        </div>
      </div>
    </div>
  )
}
