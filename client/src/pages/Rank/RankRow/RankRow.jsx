import React from 'react'

import pic1 from "../../../DefaultProfile_1.jpg"
import "./RankRow.css"



const RankRow = ( {item, rank} ) => {

    const {icon, displayname, points} = item;

  return (
    <div className='rankRowContainer'>
        <span>{rank}</span>
        <img className='profilePic' src={icon ? icon : pic1} alt="" />
        <span>{displayname}</span>
        <span>{points}</span>

    </div>
  )
}

export default RankRow