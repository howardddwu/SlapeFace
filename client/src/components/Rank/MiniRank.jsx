import React from "react";
import { allTimeTopRank } from "../../API/RankAPI.js";
import { useEffect, useState } from "react";
import pic1 from "../../DefaultProfile_1.jpg";
import "./MiniRank.css";
import { Link } from "react-router-dom";
import { Card, Space } from "antd";

const MiniRank = () => {
  const [topData, setTop5Data] = useState();
  const [botData, setBot5Data] = useState();
  useEffect(() => {
    try {
      allTimeTopRank(setTop5Data, setBot5Data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(botData);
  return (
    <div>
      <Card
        title="Top 5 Rank"
        extra={<a href="/ranking">More</a>}
        style={{
          width: 300,
        }}
      >
        {topData &&
          topData.map((item, index) => (
            <div key={index} className="rank-container">
              <div>{index + 1}.</div>
              <div>
                <img
                  src={item.icon ? item.icon : pic1}
                  alt=""
                  className="icon"
                />
              </div>
              <div>{item.displayname}</div>
              <div>{item.points}</div>
            </div>
          ))}
      </Card>

      <Card
        title="Bottom 5 Rank"
        extra={<a href="/ranking">More</a>}
        style={{
          width: 300,
          marginTop: '10px'
        }}
      >
        {botData &&
          botData.map((item, index) => (
            <div key={index} className="rank-container">
              <div>{index + 1}.</div>
              <div>
                <img
                  src={item.icon ? item.icon : pic1}
                  alt=""
                  className="icon"
                />
              </div>
              <div>{item.displayname}</div>
              <div>{item.points}</div>
            </div>
          ))}
      </Card>
    </div>
  );
};
export default MiniRank;
