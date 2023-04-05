import dayjs from 'dayjs'

export function getRemainingTime(timeInMs) {
  const timeDayjs = dayjs(timeInMs)
  const nowDayjs = dayjs()
  return {
    seconds: getRemainingSeconds(nowDayjs, timeDayjs),
    minutes: getRemainingMinutes(nowDayjs, timeDayjs),
    hours: getRemainingHours(nowDayjs, timeDayjs),
    days: getRemainingDays(nowDayjs, timeDayjs),
  }
}

function getRemainingSeconds(nowDayjs, timeDayjs) {
  const seconds = timeDayjs.diff(nowDayjs, 'seconds') % 60
  return padWithZeros(seconds, 2)
}

function getRemainingMinutes(nowDayjs, timeDayjs) {
  const minutes = timeDayjs.diff(nowDayjs, 'minutes') % 60
  return padWithZeros(minutes, 2)
}

function getRemainingHours(nowDayjs, timeDayjs) {
  const hours = timeDayjs.diff(nowDayjs, 'hours') % 24
  return padWithZeros(hours, 2)
}

function getRemainingDays(nowDayjs, timeDayjs) {
  const days = timeDayjs.diff(nowDayjs, 'days')
  return days.toString()
}

function padWithZeros(number, minLength) {
  const numberString = number.toString()
  if (numberString.length >= minLength) {
    return numberString
  }
  return '0'.repeat(minLength - numberString.length) + numberString
}
