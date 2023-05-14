// import { setTimeout } from "timers/promises";
import fs from 'fs'

import express from "express";


export const readFile = () => {

    try {
        let res = fs.readFileSync('./News/NewsDB.json', 'utf8');
        return JSON.parse(res)
    } catch (error) {
        console.log(error)
        return null
    }
}


export const writeFile = (newsData) => {

    // var json = JSON.stringify(newsData);
    var obj = {
        updateAt: new Date(),
        status: newsData.status,
        totalResults: newsData.totalResults,
        articles: newsData.articles, //array of objects
    }

    fs.writeFile('./News/NewsDB.json', JSON.stringify(obj), 'utf8', function Callback(err, data) {
        if (err) {
            console.log(err)
        }
    });
}



export const fetchData = async () => {

    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + process.env.NEWS_API_KEY;

    try {
        const res = await fetch(url)
        const json = await res.json();
        if (json) {
            console.log("News API: Fetching news data successfully.")
        }

        writeFile(json)

    } catch (error) {
        console.log(error)
    }
}


export const checkStatus = async () => {
    const data = await readFile();
    if (data) {
        if (!data.articles || data.articles.length < 2) {
            console.log("News API: no valid aricles")
            return true
        }

        const updateAt = data.updateAt ? Date.parse(data.updateAt) : 0;
        var res = (new Date().getTime() - updateAt) / 60000

        //If it's been six hours since the last update, fetch news
        const ifReFetch = res > 360 ? true : false;

        return ifReFetch
    }

    // some error happend when reading file or file is empty
    //return true to refetch news 
    else {
        console.log("News API: file is empty or reading file error")
        return true;
    }

}



export const firstTimeFetch = async () => {
    // await setTimeout(10000);
    const ifReFetch = await checkStatus();
    if (ifReFetch) {
        console.log("Running Server, Fetching news data.");
        fetchData();
    }
    else{
        console.log("Running Server, news data is valid. Stop Fetching")
    }
}





export const getNews = async (req, res) => {

    try {
        const data = await readFile();
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
}


export const router = express();

router.get("/getNews", getNews )

export {router as NewsRouter};
