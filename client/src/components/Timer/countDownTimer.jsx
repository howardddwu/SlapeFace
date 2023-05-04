import { useState, useEffect } from "react";
import * as Timer from "./countDownTimerDetail.jsx";
import "../../styles/countDownTimer.css";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const CountDownTimer = ({ timeInMs, forceUpdate, setForceUpdate }) => {
  const [remainingTime, setRemainTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime(timeInMs);
    }, 1000);
    return () => clearTimeout(interval);
  }, [timeInMs]);

  function updateRemainingTime(countdown) {
    setRemainTime(Timer.getRemainingTime(countdown));
    if (new Date().valueOf() > timeInMs) {
      setForceUpdate(forceUpdate + 1);
    }
  }

  return (
    <div className="CountDownTimer">
      {remainingTime.days > 0 && <div>{remainingTime.days} Days </div>}

      {remainingTime.days < 1 &&
        <><div>{remainingTime.hours} Hours </div>
          <div>{remainingTime.minutes} Min </div>
          <div>{remainingTime.seconds} Sec </div></>
      }
    </div>
  );
};

export default CountDownTimer;
