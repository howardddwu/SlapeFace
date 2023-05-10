import React from "react";
import pic1 from "../../../DefaultProfile_1.jpg";
import "./RankDetail.css";

const RankDetail = ({ item, rank }) => {
  const { icon, username, displayname, points } = item;

  return (
    <div>
      <div className="RankDetailContainer">
        <img className="RankDetailPic" src={icon ? icon : pic1} alt="" />
        <span>Rank: {rank}</span>
        <span>Score: {points}</span>
        <span>username: {username}</span>
      </div>
    </div>
  );
};

export default RankDetail;
