import React from "react";

import pic1 from "../../../DefaultProfile_1.jpg";
import "./RankRow.css";

const RankRow = ({ item, rank }) => {
  const { icon, displayname, points } = item;

  return (
    <div className="rankRowContainer">
      <span className="rank">{rank}</span>
      <div className="icon-div">
        <img className="profilePic" src={icon ? icon : pic1} alt="" />
      </div>
      <span className="name">{displayname}</span>
      <span className="points">{points}</span>
    </div>
  );
};

export default RankRow;
