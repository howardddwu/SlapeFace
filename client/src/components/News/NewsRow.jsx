import React from 'react'

export const NewsRow = ({ article }) => {


    return (
        <div>
            <br />
            <a href={article.url} target="_blank">
                <span>{article.title}</span>
                <img src={article.urlToImage} alt="" />
                <span>{article.description}</span>
            </a>
            <br />
        </div>
    )
}
