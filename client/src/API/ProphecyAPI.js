import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })


const getUserProphecy = async (userId, setProphecies, setUserInfo) => {

    try {
        await API.get('/prophecy/get/' + userId, { withCredentials: true })
            .then(
                (res) => {
                    const { data } = res
                    setProphecies(data.slice(0, data.length - 2))
                    if (setUserInfo) {
                        setUserInfo(data[data.length - 1])
                    }
                }
            )
    } catch (error) {
        console.log(error)
    }
}

async function getData (setProphecies) {
    await fetch(`${process.env.REACT_APP_API_URL}/prophecy/getAll`)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
        .then((jsondata) => {
            setProphecies(jsondata)
            //default : store by number of user participated(HOT)
            jsondata = jsondata.sort((objA, objB) => {
                if (objA.numUser > objB.numUser) return -1
                if (objB.numUser > objA.numUser) return 1
                //if prophecies having same number of user participated, then display it by time
                return (
                    (Number(new Date(objA.createAt)) -
                        Number(new Date(objB.createAt))) *
                    -1
                )
            })
            setProphecies(jsondata)
        })
        .catch((error) => console.log('error', error))
}




// sort prophecies by number of user participate
function sortByParticipated (prophecies, setProphecies, setSortByCreateTime) {
    setSortByCreateTime(false)
    let propheciesList = prophecies.sort((objA, objB) => {
        if (objA.numUser > objB.numUser) return -1
        if (objB.numUser > objA.numUser) return 1
        //if prophecies having same number of user participated, then display it by time
        return (
            (Number(new Date(objA.createAt)) - Number(new Date(objB.createAt))) * -1
        )
    })
    setProphecies(propheciesList)
}

// sort prophecies by created time
function sortByTime (prophecies, setProphecies, setSortByCreateTime) {
    setSortByCreateTime(true)
    let propheciesList = prophecies
        .sort(
            (objA, objB) =>
                Number(new Date(objA.createAt)) - Number(new Date(objB.createAt))
        )
        .reverse()
    setProphecies(propheciesList)
}


export { getData, sortByParticipated, sortByTime, getUserProphecy }