import React, { useEffect, useState } from 'react'
import * as NewsAPI from "../../API/NewsAPI.js"
import { NewsRow } from './NewsRow.jsx'
import "./News.css"

const News = () => {

    const [articles, setArticles] = useState()

    const fetchNews = async () => {
        try {
            const res = await NewsAPI.getNews();
            setArticles(res.data.articles)

        } catch (error) {
            setArticles(null)
            console.log(error)
        }
    }

    useEffect(() => { fetchNews() }, [])

    return (
        <div className='NewsContainer'>
            
            {articles && articles.map( (item, index) => 
                <div id={index} key={index} className="NewsRows">
                    <NewsRow article={item} />
                </div>
            
            )}
        </div>
    )
}

export default News