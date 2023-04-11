import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })


/************
* LOG IN API *
*************/
export const logIn = async (formData) => {
    let returnRes = {} // holds for return result

    try {
        await API.post('/auth/login', formData, { withCredentials: true })
            .then((res) => {
                returnRes = res
            })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}

export const GooglelogIn = async (userId, TOKEN) => {
    let returnRes = {} // holds for return result

    try {
        await API.post('/auth/GoogleLogin/'+userId, TOKEN, { withCredentials: true })
            .then((res) => {
                returnRes = res
            })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}

/*************
* SIGN UP API *
**************/
// export const signUp = (formData) => API.post(
//     '/auth/register',
//     formData,
//     { withCredentials: true })
//     .then((res) => { console.log(res); return res; })


export const signUp = async (formData) => {
    let returnRes = {} // holds for return result

    try {
        await API.post('/auth/register', formData, { withCredentials: true })
            .then((res) => {
                returnRes = res
            })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}

/*************
* Log Out API *
**************/
export const logOut = async (token) => {
    let returnRes = {};
    // const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    };


    try {
        await API.get('/auth/logout', config)
            .then((res) => {
                returnRes = res
            })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}






// export const refreshToken = async (token) => {
//     let returnRes = {};
//     console.log(token)
//     const config = {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true
//     };

//     try {
//         await API.post('/auth/refreshToken', config)
//             .then((res) => {
//                 returnRes = res
//             })
//     } catch (error) {
//         console.log(error)
//     }
//     return (returnRes)
// }
export const refreshToken = async (token) => {
    let returnRes = {};
    // const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    };


    try {
        await API.get('/auth/refreshToken', config)
            .then((res) => {
                returnRes = res
            })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}



export const myInfo = async (token) => {
    let returnRes = {};
    // const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    };


    try {
        await API.get('/auth/myProfile', config)
            .then((res) => {
                returnRes = res
            })
    } catch (error) {
        console.log(error)
    }
    return (returnRes)
}