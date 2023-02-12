import React from 'react'

import pic1 from "../../../DefaultProfile_1.jpg"
import pic2 from "../../../DefaultProfile_2.jpg"
import "./RankRow.css"



const RankRow = ( {item, rank} ) => {

    const {img, displayname, points} = item;

  return (
    <div className='rankRowContainer'>
        <span>{rank}</span>
        {img ? <img className='profilePic' src={img} alt="" /> : <img  className='profilePic' src={pic1} alt="" />}
        <span>{displayname}</span>
        <span>{points}</span>

    </div>
  )
}

export default RankRow