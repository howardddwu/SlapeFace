import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })


export const getNews = async () => {
    let returnRes = {} // holds for return result

    try {
        await API.get('news/getNews')
            .then((res) => { returnRes = res; })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}

