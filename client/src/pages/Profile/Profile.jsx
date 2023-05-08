import React from "react";

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserProfile from "./UserProfile";
import Prophecy from "../../components/Prophecy/Prophecy.js";
import {
  getData,
  getUserProphecy,
  getUserVotedProphecy,
  sortByParticipated,
  sortByTime,
} from "../../API/ProphecyAPI";
import "./Profile.css";
import { AuthContext } from "../../context/AuthProvider";
import pic1 from "../../DefaultProfile_1.jpg";

import {
  IdcardOutlined,
  HomeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

const Profile = ({ socket }) => {
  const { user } = useContext(AuthContext);
  const [postType, setPostType] = useState("posted");

  //======================== Page Decision ==============================

  //======================== Menu UI ==============================

  const [prophecies, setProphecies] = useState([]);

  const [sortByCreateTime, setSortByCreateTime] = useState(false);
  // Get All comments from DB
  useEffect(() => {
    if (postType === "posted") {
      getUserProphecy(user._id, setProphecies);
    } else {
      getUserVotedProphecy(user._id, setProphecies);
    }
  }, [postType]);

  // sort prophecies by created time
  function ByTime() {
    sortByTime(prophecies, setProphecies, setSortByCreateTime);
  }

  return (
    <div className="ProfileContainer">
      <div className="userinfo-wrapper">
        <img
          src={user.icon ? user.icon : pic1}
          alt=""
          className="profile-icon"
        />
        <div className="username">{user.displayname}</div>

        <Link to="/profile/edit">
          <Button className="edit-profile-button">Edit Profile</Button>
        </Link>
      </div>
      <div className="ProfileProphecy" style={{ marginBottom: "30px" }}>
        <div className="postNavigation">
          <div onClick={() => setPostType("posted")}>Posted</div>
          <div>|</div>
          <div onClick={() => setPostType("voted")}>Voted</div>
        </div>

        <div>
          {prophecies.map((item) => (
            <Prophecy key={item._id} data={item} socket={socket}></Prophecy>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

{
  /* <div style={{ marginBottom: "30px" }}>

<button onClick={ByParticipated}>HOT</button>
<button onClick={ByTime}>NEW</button>
<div>
    {prophecies.map((item) => (
        <Prophecy key={item._id} data={item}></Prophecy>
    ))}
</div>
</div> */
}
