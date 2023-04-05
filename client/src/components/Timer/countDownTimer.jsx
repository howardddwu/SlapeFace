import { useState, useEffect } from 'react'
import * as Timer from './countDownTimerDetail.jsx'
import '../../styles/countDownTimer.css'

const defaultRemainingTime = {
  seconds: '00',
  minutes: '00',
  hours: '00',
  days: '00',
}

const CountDownTimer = ({ timeInMs }) => {
  const [remainingTime, setRemainTime] = useState(defaultRemainingTime)

  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(timeInMs)
    }, 1000)
    return () => clearTimeout(interval)
  }, [timeInMs])

  function updateRemainingTime(countdown) {
    setRemainTime(Timer.getRemainingTime(countdown))
  }

  return (
    <div className="CountDownTimer">
      <div>{remainingTime.days} Days </div>
      <div>{remainingTime.hours} Hours </div>
      <div>{remainingTime.minutes} Min </div>
      <div>{remainingTime.seconds} Sec </div>
    </div>
  )
}

export default CountDownTimer
