import React from 'react'
import { useState, useEffect } from 'react'

import Prophecy from './Prophecy'

const Home = () => {
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
      <h1>User's home page</h1>
      <button onClick={sortByParticipated}>HOT</button>
      <button onClick={sortByTime}>NEW</button>
      <div>
        {prophecies.map((item) => (
          <Prophecy key={item._id} data={item}></Prophecy>
        ))}
      </div>
    </div>
  )
}

export default Home
