import React from "react";
import {allTimeTopRank} from "../../API/RankAPI.js"
import  { useEffect, useState } from 'react'
import pic1 from "../../DefaultProfile_1.jpg"
import "./MiniRank.css"

const MiniRank = ()=>{
    const [topData,setTop5Data] = useState()
    const [botData,setBot5Data] = useState()
    useEffect(() => {
        try {
          allTimeTopRank(setTop5Data,setBot5Data);
        } catch (error) {
          console.log(error)
        }
    },[])
   
    console.log(botData);
    return(
        <div className="miniRank-container">
            <h1>Top 5 Rank</h1>
            {topData&&topData.map((item,index)=>
                <div key={index} className="rank-container">
                    <div>{index+1}.</div>
                    <div>
                         <img src={item.icon ? item.icon : pic1} alt="" className="icon"/>
                    </div>
                    <div>
                        {item.displayname}
                    </div>
                    <div>
                        {item.points}
                    </div>
                </div>
            )}
            <h1>Bottom 5 Rank</h1>
            {botData&&botData.map((item,index)=>
                <div key={index} className="rank-container">
                    <div>{index+1}.</div>
                    <div>
                         <img src={item.icon ? item.icon : pic1} alt="" className="icon"/>
                    </div>
                    <div>
                        {item.displayname}
                    </div>
                    <div>
                        {item.points}
                    </div>
                </div>
            )}
        </div>
    )
}
export default MiniRank;