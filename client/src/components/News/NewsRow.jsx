import React from "react";
import "./NewsRow.css";

export const NewsRow = ({ article }) => {
  // function formatDate(date){
  //     let d = "" + new Date(date)
  //     d = d.slice(4)
  //     d = d.slice(0,-41)
  //     return (d)
  // }
  return (
    <div className="NewsRowContainer">
      <div className="NewsRowWrapper">
        <a href={article.url} target="_blank">
          <span className="NewsRowTitle">{article.title}</span>
        </a>
        <img className="NewsRowImg" src={article.urlToImage} alt="" />
        <span className="NewsRowDesc">{article.description}</span>
      </div>
    </div>
  );
};
