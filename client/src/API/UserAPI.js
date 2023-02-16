import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })



export const changePassword = async (formData, userId) => {
    let returnRes = {} // holds for return result

    try {
        await API.put('/user/changepassword/'+userId, formData)
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
        await API.put('/user/editProfile/'+userId, formData)
            .then((res) => {
                returnRes = res
            })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}

