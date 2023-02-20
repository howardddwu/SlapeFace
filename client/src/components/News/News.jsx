import React, { useEffect, useState } from 'react'
import * as NewsAPI from "../../API/NewsAPI.js"
import { NewsRow } from './NewsRow.jsx'

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
        <div>
            
            {articles && articles.map( (item, index) => 
                <div id={index} key={index}>
                    <NewsRow article={item} />
                </div>
            
            )}
        </div>
    )
}

export default News