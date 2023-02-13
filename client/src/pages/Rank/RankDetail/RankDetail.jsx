import React from 'react'
import pic1 from "../../../DefaultProfile_1.jpg"
import "./RankDetail.css"


const RankDetail = ({ item, rank }) => {

    const { img, username, displayname, points } = item;

    return (
        <div>
            <div className='RankDetailContainer'>
                {img ? <img className='RankDetailPic' src={img} alt="" /> : <img className='RankDetailPic' src={pic1} alt="" />}
                <span>Rank: {rank}</span>
                <span>Score: {points}</span>
                <span>username: {username}</span>
                <span>display name: {displayname}</span>
            </div>
        </div>
    )
}

export default RankDetail