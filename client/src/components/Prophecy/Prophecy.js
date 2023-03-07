import React from 'react'
import { Bar } from "react-chartjs-2"
import Chart from 'chart.js/auto'
import Comments from '../Comment/Comments'
import '../../styles/Prophecy.css'

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

  const votingData = {
    labels: data.options.map((item) => item.option),
    datasets: [
      {
        label: "Users Votes",
        data: data.options.map((item) => item.VoterId.length),
        backgroundColor: [
          //如果很多选项 多加点颜色
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
      },
    ],
  }
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
        hoverBorderWidth: 4,
      },
    },
  }


  //还需要：
  // 1. 以视图方式显示每个选项投票人数
  return (
    <div className='Prophecy'>

      <div className='Prophecy-header'>
        <h2 className='Prophecy-title'>{data.title}</h2>
        <div className='Prophecy-status'>
          {data.result !== -1 && <div style={{ "color": "red" }}>Close</div>}
          {data.result === -1 && <div style={{ "color": "green" }}>Open</div>}
        </div>

      </div>


      <Bar data={votingData} options={options} />
      <div>Number Vote: {data.numUser}</div>
      <div>{modifyCreatedTime(data.createdTime)}</div>

      <Comments ProphecyId={data._id} />


    </div >
  )
}

export default Prophecy
