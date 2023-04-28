import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthProvider";
import * as AuthAction from "../../actions/AuthAction";
import { sortByParticipated, sortByTime } from "../../API/ProphecyAPI";
import * as SearchAPI from "../../API/SearchAPI";
import SearchBar from "../../components/SearchBar/SearchBar";
import Prophecy from "../../components/Prophecy/Prophecy";
import News from "../../components/News/News";
import MiniRank from "../../components/Rank/MiniRank";
import "./Home.css";
import CreateProphecyButton from "../../components/Prophecy/createProphecyButton";
import { Pagination } from 'antd';

const Home = () => {
  const { isFetching, dispatch, user, token } = useContext(AuthContext);

  const handleLogout = async () => {
    await AuthAction.logOut(token, dispatch);
  };

  // Prophecy 部分还需要：
  // 1. 限制显示数量（预防太多数据）
  // 2. 允许用户参与投票
  const [prophecies, setProphecies] = useState([]);

  const [sortByCreateTime, setSortByCreateTime] = useState(false);

  // Get All comments from DB
  useEffect(() => {
    SearchAPI.SearchProphecy({ searchKey: "", category: [] }, setProphecies);
    
    
  }, []);
console.log(prophecies);

  // sort prophecies by created time
  function ByTime() {
    sortByTime(prophecies, setProphecies, setSortByCreateTime);
  }

  // sort prophecies by number of user participate
  function ByParticipated() {
    sortByParticipated(prophecies, setProphecies, setSortByCreateTime);
  }

  // pagination
  const numEachPage = 2;

  const [pageSlice, setPageSlice] = useState(
    {
      minValue: 0,
      maxValue: 2,
    }
  )

  const handlePageChange = value => {
    setPageSlice({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage
    });
  };

  return (
    <div className="HomeContainer">
      <div className="HomeLeft">
        <News />
      </div>

      <div className="HomeMiddle">
        <div className="SearchWraper">
          <SearchBar setProphecies={setProphecies} />
        </div>

        <div style={{ marginTop: "30px" }}>
          <button onClick={ByParticipated}>HOT</button>
          <button onClick={ByTime}>NEW</button>
          <Pagination 
            defaultCurrent={1} 
            total={prophecies.length}
            pageSize = {numEachPage}
            onChange={handlePageChange}
             />
          <div>
          {prophecies && prophecies.length > 0 &&
            prophecies.slice(pageSlice.minValue, pageSlice.maxValue).map(item => (
              <Prophecy key={item._id} data={item}></Prophecy>
            ))}
          </div>
        </div>
      </div>

      <div className="HomeRight">
        <h1>User's home page</h1>
        {user && (
          <div>
            <h3>User Info:</h3>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        )}

        <Link className="trouble" to="/ranking">
          <button className="button infoButton">Rank</button>
        </Link>
        <Link className="trouble" to="/profile">
          <button className="button infoButton">Profile</button>
        </Link>
        <button className="button infoButton" onClick={handleLogout}>
          Log Out
        </button>
        <div>
          <MiniRank/>
        </div>
        <div style={{ marginTop: "30px" }}>
          <CreateProphecyButton />
        </div>
      </div>
    </div>
  );
};

export default Home;
