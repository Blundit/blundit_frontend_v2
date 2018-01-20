import moment from 'moment'
class TimeFormatting {
  static prettyTimeRemaining(end, start = null) {
    if (end === undefined) return null
    let startTime;

    if (start) {
      startTime = moment(start)
    } else {
      startTime = moment()
    }

    const endTime = moment(end)

    const days = endTime.diff(startTime, 'days')
    const hours = endTime.diff(startTime, 'hours')
    const minutes = endTime.diff(startTime, 'minutes')
    
    let remaining;

    if (days > 0) {
      remaining = days + " days"
    } else if (days <= 0 && hours > 0) {
      remaining = hours + " hours"
    } else if (days <= 0 && hours <= 0 && minutes > 0) {
      remaining = minutes + " minutes"
    } else {
      remaining = "0 seconds"
    }

    return remaining
  }
}

export default TimeFormatting;