import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { sortByParticipated, sortByTime } from "../../API/ProphecyAPI";
import { AuthContext } from "../../context/AuthProvider";
import * as AuthAction from "../../actions/AuthAction";

import * as SearchAPI from "../../API/SearchAPI";
import SearchBar from "../../components/SearchBar/SearchBar";
import Prophecy from "../../components/Prophecy/Prophecy";
import News from "../../components/News/News";
import MiniRank from "../../components/Rank/MiniRank";
import "./Home.css";
import CreateProphecyButton from "../../components/Prophecy/createProphecyButton";
import { Pagination } from "antd";

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
  const [forceUpdate, setForceUpdate] = useState(0);

  // Get All comments from DB
  useEffect(() => {
    SearchAPI.SearchProphecy({ searchKey: "", category: [] }, setProphecies);
  }, [forceUpdate]);

  // sort prophecies by created time
  function ByTime() {
    setSortByCreateTime(true);
    sortByTime(prophecies, setProphecies);
  }

  // sort prophecies by number of user participate
  function ByParticipated() {
    setSortByCreateTime(false);
    sortByParticipated(prophecies, setProphecies);
  }

  // pagination
  const numEachPage = 2;

  const [pageSlice, setPageSlice] = useState({
    minValue: 0,
    maxValue: 2,
  });

  const handlePageChange = (value) => {
    setPageSlice({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
  };

  return (
    <div className="HomeContainer">
      <div className="HomeLeft">
        <News />
      </div>

      <div className="HomeMiddle">
        <div className="SearchWraper">
          <SearchBar
            prophecies={prophecies}
            setProphecies={setProphecies}
            sortByCreateTime={sortByCreateTime}
          />
        </div>
        <div className="controllerWrapper">
          <div className="mid-button">
            <CreateProphecyButton
              forceUpdate={forceUpdate}
              setForceUpdate={setForceUpdate}
            />
          </div>
          <div className="buttonWrapper">
            <button className="sortButton" onClick={ByParticipated}>
              HOT
            </button>
            <button className="sortButton" onClick={ByTime}>
              NEW
            </button>
          </div>

          <Pagination
            defaultCurrent={1}
            total={prophecies.length}
            pageSize={numEachPage}
            onChange={handlePageChange}
          />
        </div>

        <div />
        <div>
          <div>
            {prophecies &&
              prophecies.length > 0 &&
              prophecies
                .slice(pageSlice.minValue, pageSlice.maxValue)
                .map((item) => (
                  <Prophecy key={item._id} data={item}></Prophecy>
                ))}
          </div>
        </div>
      </div>

      <div className="HomeRight">
        <div>
          <MiniRank />
        </div>
        <div style={{ marginTop: "30px" }}>
          <CreateProphecyButton
            forceUpdate={forceUpdate}
            setForceUpdate={setForceUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
