import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })


export const SearchProphecy = async (dataFrom, setProphecies) => {

    try {
        await API.post('/search/searchProphecy', dataFrom)
            .then(
                (res) => {
                    const { data } = res;
                    setProphecies(data)
                }
            )
    } catch (error) {
        console.log(error)
    }
}