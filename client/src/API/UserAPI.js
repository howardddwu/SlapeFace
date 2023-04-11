import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })



export const changePassword = async (formData, userId) => {
    let returnRes = {} // holds for return result

    try {
        await API.put('/user/changepassword/' + userId, formData)
            .then((res) => {
                returnRes = res
            })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}


export const editProfile = async (formData, userId) => {
    let returnRes = {} // holds for return result

    try {
        await API.put('/user/editProfile/' + userId, formData)
            .then((res) => {
                returnRes = res
            })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}

export const getUserInfo = async (userId, setUserInfo) => {
    try {
        await API.get('/user/getUserInfo/' + userId)
            .then((res) => {
                setUserInfo(res.data)
            })
    } catch (error) {
        console.log(error)
    }
}

export const getUserInfoData = async (userId) => {
    let returnRes = {} // holds for return result

    try {
        await API.get('/user/getUserInfo/' + userId)
            .then((res) => {
                returnRes = res.data
            })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}