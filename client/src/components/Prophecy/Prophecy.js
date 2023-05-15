import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Comments from "../Comment/Comments";
import "../../styles/Prophecy.css";
import VotingVerifyModal from "./VotingVerifyModal";
import pic1 from "../../DefaultProfile_1.jpg";
import * as UserAPI from "../../API/UserAPI.js";
import CountDownTimer from "../Timer/countDownTimer";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom"


const Prophecy = (props) => {

  const navigate = useNavigate()

  const { data, socket, ifModal } = props;
  const { user } = useContext(AuthContext);

  const [OpenVotingModal, setOpenVotingModal] = useState(false);
  const [OpenVerifyModal, setOpenVerifyModal] = useState(false);
  const [userParticipated, setUserParticipated] = useState(
    checkUserParticipated()
  );
  const [userChoice, setUserChoice] = useState(getUserChoice());
  const [authorInfo, setAuthorInfo] = useState("");
  const [currentCorrectUser, setCurrentCorrectUser] = useState("");
  const [correctVoteUserInfo, setCorrectVoteUserInfo] = useState("");
  const [correctUserNum, setCorrectUserNum] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    UserAPI.getUserInfo(data.author, setAuthorInfo);
  }, []);

  function checkUserParticipated() {
    if (!user) return false;

    for (let i = 0; i < data.options.length; i++) {
      if (data.options[i].VoterId.includes(user._id)) {
        return true;
      }
    }
    return false;
  }

  function getUserChoice() {
    if (!user) return "";

    for (let i = 0; i < data.options.length; i++) {
      if (data.options[i].VoterId.includes(user._id)) {
        return data.options[i].option;
      }
    }
    return "";
  }

  function modifyCreatedTime(createdTime) {
    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    createdTime = new Date(createdTime);
    const year = createdTime.getFullYear();
    const month = monthName[createdTime.getMonth()];
    const date = createdTime.getDate();
    return month + " " + date + ", " + year;
  }

  const votingData = {
    labels: data.options.map((item) => item.option),
    datasets: [
      {
        label: "Users Votes",
        data: data.options.map((item) => item.VoterId.length),
        // backgroundColor: [
        //   //如果很多选项 多加点颜色
        //   "rgba(255, 99, 132, 0.2)",
        //   "rgba(255, 159, 64, 0.2)",
        //   "rgba(255, 205, 86, 0.2)",
        //   "rgba(75, 192, 192, 0.2)",
        //   "rgba(54, 162, 235, 0.2)",
        //   "rgba(153, 102, 255, 0.2)",
        //   "rgba(201, 203, 207, 0.2)",
        // ],
        // borderColor: [
        //   "rgb(255, 99, 132)",
        //   "rgb(255, 159, 64)",
        //   "rgb(255, 205, 86)",
        //   "rgb(75, 192, 192)",
        //   "rgb(54, 162, 235)",
        //   "rgb(153, 102, 255)",
        //   "rgb(201, 203, 207)",
        // ],
        backgroundColor: [
          //如果很多选项 多加点颜色
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(255, 205, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(201, 203, 207, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(153, 102, 255)",
          "rgba(201, 203, 207)",
        ],
      },
    ],
  };
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
        hoverBorderWidth: 4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    borderRadius: 6,
    borderColor: "",
  };


  function votingProphecy() {
    if (user) {
      setOpenVotingModal(true);
    } else {
      navigate(`/login`)
    }

  }

  function verifyProphecy() {
    setOpenVerifyModal(true);
  }

  async function submitVote(optionIndex) {
    setOpenVotingModal(false);
    data.options[optionIndex].VoterId.push(user._id);
    //add user votes into prophecy options
    await fetch(`${process.env.REACT_APP_API_URL}/prophecy/edit/` + data._id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        options: data.options,
        numUser: data.numUser + 1,
      }),
    })
      .then(console.log("success"))
      .catch((error) => console.log("error", error));

    user.votes.push(data._id);
    user.points = user.points - 10;
    // add this prophecy into user model under votes(indicated user particiated this prophecy)
    // take off 10 points from user
    await fetch(
      `${process.env.REACT_APP_API_URL}/user/editProfile/` + user._id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points: user.points, votes: user.votes }),
      }
    )
      .then(console.log("success"))
      .catch((error) => console.log("error", error));

    setUserParticipated(true);
    setUserChoice(data.options[optionIndex].option);
  }

  async function submitVerify(optionIndex) {
    data.result = optionIndex;

    //add the result to prophecy
    await fetch(`${process.env.REACT_APP_API_URL}/prophecy/edit/` + data._id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result: data.result }),
    })
      .then(console.log("verify result success"))
      .catch((error) => console.log("error", error));

    setCorrectUserNum(data.options[optionIndex].VoterId.length);
    const correctnum = data.options[optionIndex].VoterId.length;
    addPointsToUser(optionIndex, correctnum);

    //=============================================
    //send result notification to every participated user
    const options = data.options;

    if (socket) {
      // console.log(data)
      const options = data.options;
      for (let i = 0; i < options.length; i++) {
        let voterList = options[i].VoterId;

        //send msg to each voter:
        for (let j = 0; j < voterList.length; j++) {
          const dataform = {
            sender: "system",
            recipient: voterList[j],
            prophecyInfo: {
              title: data.title,
              result: options[optionIndex].option,
              yourChoice: options[i].option,
              ifCorrect: i === optionIndex ? true : false,
            },
            content: "Result of the Prophecy: " + data.title + ".",
            prophecyId: data._id,
          };

          socket.emit("new-message", dataform);
        }
      }
    }

    setOpenVerifyModal(false);
  }

  //give out the points to the user who vote on the correct result
  async function addPointsToUser(optionIndex, correctnum) {
    for (let i = 0; i < data.options[optionIndex].VoterId.length; i++) {
      setCurrentCorrectUser(data.options[optionIndex].VoterId[i]);
      //console.log(data.options[optionIndex].VoterId[i])
      let info = await UserAPI.getUserInfoData(
        data.options[optionIndex].VoterId[i]
      );
      console.log(info);

      //console.log(correctVoteUserInfo)
      if (info !== "") {
        addPoints(info, data.numUser * 10, correctnum);
      }
    }
  }
  /*
  useEffect(() => {
    if (currentCorrectUser !== '') {
      //console.log(currentCorrectUser)
      UserAPI.getUserInfo(currentCorrectUser, setCorrectVoteUserInfo)
    }
  }, [currentCorrectUser])
  */

  async function addPoints(userdata, pricePool, correctnum) {
    let usePoints = userdata.points ? userdata.points : 0;

    // console.log("userdata.points: "+userdata.points)
    // console.log("pricePool: "+pricePool)
    // console.log("correctUserNum: "+correctnum)

    // add point to this user
    await fetch(
      `${process.env.REACT_APP_API_URL}/user/editProfile/` + userdata._id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          points: Math.round(usePoints + pricePool / correctnum),
        }),
      }
    )
      .then(console.log("add points success"))
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="Prophecy">
      <div className="Prophecy-header">
        <h2 className="Prophecy-title">{data.title}</h2>
        <div className="Prophecy-status">
          {new Date(data.endTime.valueOf()) <= new Date() ? (
            <div style={{ color: "red" }}>Close</div>
          ) : (
            <div style={{ color: "green" }}>Open</div>
          )}
        </div>
      </div>
      <div className="ProphecytagWrapper">
        {data.category &&
          data.category.length > 0 &&
          data.category.map((item, index) => (
            <Tag color="green" style={{ fontSize: "15px" }}>
              #{item}
            </Tag>
          ))}
      </div>
      <div className="Prophecy-description">{data.description}</div>

      <hr className="hr-mid-circle" />

      <Bar data={votingData} options={options} />
      <div className="Prophecy-detail">
        <div className="Prophecy-info">
          <div>Number Vote: {data.numUser}</div>
          <div>{modifyCreatedTime(data.createdTime)}</div>
        </div>

        {/* <div className="ProphecytagWrapper">
          {data.category && data.category.length > 0 &&
            data.category.map((item, index) =>
              <Tag color="green" style={{ fontSize: "15px" }}>#{item}</Tag>

            )
          }
        </div> */}
      </div>

      <div className="Prophecy-TimeAndParticipateWrapper">
        <div className="Prophecy-ParticipateWrapper">
          {userParticipated && (
            <div className="Prophecy-userParticipate">
              <div>Voted !</div>
              <div>Your Choices: {userChoice}</div>
            </div>
          )}
          {data.result === -1 &&
            new Date(data.endTime.valueOf()) > new Date() &&
            !userParticipated && (
              <button className="btn btn-primary" onClick={votingProphecy}>
                Participate
              </button>
            )}
        </div>

        <div className="Prophecy-TimeWrapper">
          <div className="Prophecy-author">
            Posted by :
            {authorInfo === null ? (
              <div>Non-Existent user</div>
            ) : (
              <div className="Prophecy-author-info">
                <img
                  src={authorInfo.icon ? authorInfo.icon : pic1}
                  alt=""
                  className="Prophecy-author-icon"
                />
                <div>{authorInfo.displayname}</div>
              </div>
            )}
          </div>

          <div className="Prophecy-OpeningTime">
            {new Date(data.endTime.valueOf()) > new Date() ? (
              <div className="Prophecy-CountDown">
                <div>Prophecy close after : </div>
                <CountDownTimer
                  timeInMs={new Date(data.endTime).valueOf()}
                  forceUpdate={forceUpdate}
                  setForceUpdate={setForceUpdate}
                />
              </div>
            ) : data.result === -1 ? (
              <div className="Prophecy-verify">
                <div>Closed, Waiting for verify </div>
                {user !== null && user._id === data.author && socket && (
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={verifyProphecy}
                  >
                    Verify
                  </button>
                )}
              </div>
            ) : (
              <div>
                Prophecy Closed, Correct result is{" "}
                {data.options[data.result].option}
              </div>
            )}
          </div>
        </div>
      </div>

      {OpenVotingModal && (
        <VotingVerifyModal
          type="Voting"
          Prophecy={data}
          closeModal={setOpenVotingModal}
          submit={submitVote}
        />
      )}
      {OpenVerifyModal && (
        <VotingVerifyModal
          type="Verify"
          Prophecy={data}
          closeModal={setOpenVerifyModal}
          submit={submitVerify}
        />
      )}

      <hr className="hr-mid-circle" />

      {!ifModal && <Comments ProphecyId={data._id} />}
    </div>
  );
};

export default Prophecy;
