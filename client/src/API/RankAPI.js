import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })



export const weeklyRank = async (formData) => {
    let returnRes = {} // holds for return result

    try {
        await API.get('rank/weeklyRank', { withCredentials: true })
            .then((res) => { returnRes = res; })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}

export const allTimeRank = async (formData) => {
    let returnRes = {} // holds for return result

    try {
        await API.get('rank/allRank', { withCredentials: true })
            .then((res) => { returnRes = res; })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}

export const allTimeTopRank = async (setTop5Data,setBot5Data) => {

    try {
        await API.get('rank/allRank', { withCredentials: true })
            .then((res) => (setTop5Data(res.data.slice(0,5),
                            setBot5Data(res.data.slice(res.data.length-5,res.data.length).reverse()))
            ))
    } catch (error) {
        console.log(error)
    }
}

