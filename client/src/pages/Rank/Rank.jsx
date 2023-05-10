import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as RankAIP from "../../API/RankAPI.js";
import "./Rank.css";
import RankDetail from "./RankDetail/RankDetail.jsx";
import RankRow from "./RankRow/RankRow.jsx";
import { Pagination } from "antd";
const Rank = () => {
  const [rows, setRow] = useState([]);
  const [detail, setDetail] = useState();

  const fetchWeeklyRank = async () => {
    try {
      const res = await RankAIP.weeklyRank();
      setRow(res.data);
      setDetail([1, res.data[0]]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAlltimeRank = async () => {
    try {
      const res = await RankAIP.allTimeRank();
      setRow(res.data);
      setDetail([1, res.data[0]]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeeklyRank();
  }, []);

  const handleDetial = (e) => {
    const selected = e.currentTarget.id;
    setDetail([+selected + 1, rows[selected]]);
  };

  // pagination
  const numEachPage = 8;
  const [pageSlice, setPageSlice] = useState({
    minValue: 0,
    maxValue: 8,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (value) => {
    setPageSlice({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
    setCurrentPage(value);
    console.log(value);
  };
  return (
    <div className="RankContainer">
      <div className="Rank-leftside">
        {detail && <RankDetail item={detail[1]} rank={detail[0]} />}
      </div>

      <div className="Rank-rightside">
        <div className="buttonsContainer">
          {/* button that decide the rows, (weekly or all time) */}
          <button className="button" onClick={fetchAlltimeRank}>
            All time
          </button>
          <button className="button" onClick={fetchWeeklyRank}>
            This Week
          </button>
          {/* <button className='button' >Reverse</button> */}
        </div>

        {/* map each result to rows */}

        <div className="RankRowsContainer">
          <Pagination
            defaultCurrent={1}
            total={rows.length}
            pageSize={numEachPage}
            onChange={handlePageChange}
          />
          {rows &&
            rows
              .slice(pageSlice.minValue, pageSlice.maxValue)
              .map((item, index) => (
                <div
                  className="RankRows button"
                  key={index}
                  id={index}
                  onClick={handleDetial}
                >
                  <RankRow
                    item={item}
                    rank={(currentPage - 1) * numEachPage + index + 1}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Rank;
