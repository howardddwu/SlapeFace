import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../../components/SearchBar/SearchBar";
import News from "../../components/News/News";
import Prophecy from "../../components/Prophecy/Prophecy";
import { getData, sortByParticipated, sortByTime } from "../../API/ProphecyAPI";
import * as SearchAPI from "../../API/SearchAPI";
import "./Square.css";
import { Pagination } from "antd";

const Square = () => {
  const initData = {
    searchKey: "",
    category: [],
  };

  const [prophecies, setProphecies] = useState([]);
  const [sortByCreateTime, setSortByCreateTime] = useState(false);
  // Get All comments from DB
  useEffect(() => {
    SearchAPI.SearchProphecy(initData, setProphecies);
  }, []);

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
    <div className="SquareContainer">
      <div className="SquareLeft">
        <News />
      </div>

      <div className="SquareMiddle">
        {/* <div className='SearchWraper'>
          <SearchBar setProphecies={setProphecies} />
        </div>

        <div className='ProfileProphecy' style={{ marginTop: "30px" }}>
          <button onClick={ByParticipated}>HOT</button>
          <button onClick={ByTime}>NEW</button>
          <div>
            {prophecies.length>0 && prophecies.map((item) => (
              <Prophecy key={item._id} data={item}></Prophecy>
            ))}
          </div>
        </div> */}
        <div className="SearchWraper">
          <SearchBar
            prophecies={prophecies}
            setProphecies={setProphecies}
            sortByCreateTime={sortByCreateTime}
          />
        </div>
        <div className="controllerWrapper">
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

      <div className="SquareRight">
        <h4>Display this page when no user logged in. ("/")</h4>

        <Link className="trouble" to="/login">
          <button className="button infoButton">Sign in</button>
        </Link>

        <Link className="trouble" to="/ranking">
          <button className="button infoButton">Rank</button>
        </Link>
      </div>
    </div>
  );
};

export default Square;
