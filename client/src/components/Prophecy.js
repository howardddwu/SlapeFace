import React from 'react'

import Comments from './Comments'
import '../styles/Prophecy.css'

const Prophecy = (props) => {

  const { data } = props
  //console.log(data)


  function modifyCreatedTime (createdTime) {
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    createdTime = new Date(createdTime)
    const year = createdTime.getFullYear()
    const month = monthName[createdTime.getMonth()]
    const date = createdTime.getDate()
    return month + " " + date + ", " + year
  }

  //还需要：
  // 1. 以视图方式显示每个选项投票人数
  // 2. 时间显示处理  //已完成
  // 3. 评论点赞区
  return (
    <div className='Prophecy'>
      {data.result === -1 && <div>Close</div>}
      {data.result !== -1 && <div>Open</div>}
      <h2>{data.title}</h2>
      <div className='Prophecy-votes'>
        {data.options.map((item, index) => (
          <div key={index}>{item.option}:{item.VoterId.length}</div>
        ))}
      </div>

      <div>Number Vote: {data.numUser}</div>
      <div>{modifyCreatedTime(data.createdTime)}</div>

      <Comments ProphecyId={data._id} />


    </div>
  )
}

export default Prophecy
