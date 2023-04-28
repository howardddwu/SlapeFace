import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })


export const SearchProphecy = async (dataFrom, setProphecies) => {

    try {
        await API.post('/search/searchProphecy', dataFrom)
            .then(
                (res) => {
                    let { data } = res;
                    data = data.sort((objA, objB) => {
                        if (objA.numUser > objB.numUser) return -1
                        if (objB.numUser > objA.numUser) return 1
                        //if prophecies having same number of user participated, then display it by time
                        return (
                            (Number(new Date(objA.createAt)) -
                                Number(new Date(objB.createAt))) *
                            -1
                        )
                    })
                    setProphecies(data)
                }
            )
    } catch (error) {
        console.log(error)
    }
}