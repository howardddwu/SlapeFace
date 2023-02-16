import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'

import ChangPassword from './ChangPassword';

import UserProfile from './UserProfile'
import Prophecy from "../../components/Prophecy.js"





const Profile = () => {


    // Prophecy 部分还需要：
    // 1. 限制显示数量（预防太多数据）
    // 2. 允许用户参与投票
    const [prophecies, setProphecies] = useState([])

    const [sortByCreateTime, setSortByCreateTime] = useState(false)
    // Get All comments from DB
    useEffect(() => {
        async function getData() {
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
        getData()
    }, [])

    // sort prophecies by created time
    function sortByTime() {
        setSortByCreateTime(true)
        let propheciesList = prophecies
            .sort(
                (objA, objB) =>
                    Number(new Date(objA.createAt)) - Number(new Date(objB.createAt))
            )
            .reverse()
        setProphecies(propheciesList)
    }

    // sort prophecies by number of user participate
    function sortByParticipated() {
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




    return (
        <div>

            <div style={{ marginBottom: "30px" }}>
                <UserProfile />
            </div>


            <div style={{ marginBottom: "30px" }}>
                <ChangPassword />
            </div>


            <div style={{ marginBottom: "30px" }}>
                <Link className='trouble' to="/home">
                    <button className='button infoButton'>
                        Home
                    </button>
                </Link>
            </div>


            <div style={{ marginBottom: "30px" }}>

                <button onClick={sortByParticipated}>HOT</button>
                <button onClick={sortByTime}>NEW</button>
                <div>
                    {prophecies.map((item) => (
                        <Prophecy key={item._id} data={item}></Prophecy>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default Profile