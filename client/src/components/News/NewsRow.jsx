import React from 'react'
import "./NewsRow.css"

export const NewsRow = ({ article }) => {


    return (
        <div className='NewsRowContainer'>

            <a href={article.url} target="_blank" className='NewsRowWrapper'>
                <span className='NewsRowTitle'>{article.title}</span>
                <img className='NewsRowImg' src={article.urlToImage} alt="" />
                <span className='NewsRowDesc' >{article.description}</span>
            </a>

        </div>
    )
}
