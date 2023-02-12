import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import * as RankAIP from "../../API/RankAPI.js"
import "./Rank.css"
import RankDetail from './RankDetail/RankDetail.jsx';
import RankRow from './RankRow/RankRow.jsx';

const Rank = () => {

  const [rows, setRow] = useState()
  const [detail, setDetail] = useState()

  const fetchWeeklyRank = async () => {
    try {
      const res = await RankAIP.weeklyRank();
      setRow(res.data)
      setDetail([1, res.data[0]])
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAlltimeRank = async () => {
    try {
      const res = await RankAIP.allTimeRank();
      setRow(res.data)
      setDetail([1, res.data[0]])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchWeeklyRank() }, [])


  const handleDetial = (e) => {
    const selected = e.currentTarget.id
    setDetail([(+selected)+1, rows[selected]])
  }


  return (
    <div className='RankContainer'>

      <div className="Rank-rightside">
        {detail && <RankDetail item={detail[1]} rank={detail[0]} />}
      </div>


      <div className="Rank-leftside">

        <div className="buttonsContainer">
          {/* button that decide the rows, (weekly or all time) */}
          <button className='button' onClick={fetchAlltimeRank}>All time</button>
          <button className='button' onClick={fetchWeeklyRank}>This Week</button>
          {/* <button className='button' >Reverse</button> */}
        </div>

        {/* map each result to rows */}
        <div className="RankRowsContainer">
          {rows && rows.map((item, index) =>
            <div className='RankRows button' key={index} id={index} onClick={handleDetial}>
              <RankRow item={item} rank={index + 1} />
            </div>
          )}
        </div>

        <Link className='trouble' to="/">
          <button className='button infoButton'>
            square
          </button>
        </Link>

      </div>



    </div>
  )
}

export default Rank