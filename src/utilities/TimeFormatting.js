import moment from 'moment'
class TimeFormatting {
  static prettyTimeRemaining(end, start = null, extra = "") {
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
      remaining = days + extra + " days"
    } else if (days <= 0 && hours > 0) {
      remaining = hours + extra + " hours"
    } else if (days <= 0 && hours <= 0 && minutes > 0) {
      remaining = minutes + extra +" minutes"
    } else {
      remaining = "0 seconds"
    }

    return remaining
  }

  static prettyTimeAgo(when) {
    if (when === undefined) return null

    const startTime = moment(when)
    const endTime = moment()

    const years = endTime.diff(startTime, 'years')
    const months = endTime.diff(startTime, 'months')
    const weeks = endTime.diff(startTime, 'weeks')
    const days = endTime.diff(startTime, 'days')
    const hours = endTime.diff(startTime, 'hours')
    const minutes = endTime.diff(startTime, 'minutes')
    const seconds = endTime.diff(startTime, 'seconds')
    
    console.log(years, months, weeks)
    let remaining;

    if (days > 0) {
      remaining = days + " days"
      if (weeks > 0 && months == 0 && years == 0) {
        remaining = weeks + " weeks"
      } else if (weeks > 0 && months > 0 && years == 0) {
        remaining = months + " months"
      } else if (weeks > 0 && months > 0 && years > 0) {
        remaining = years + " years"
      }
    } else if (days <= 0 && hours > 0) {
      remaining = hours + " hours"
    } else if (days <= 0 && hours <= 0 && minutes > 0) {
      remaining = minutes + " minutes"
    } else if (days <= 0 && hours <= 0 && minutes <= 0) {
      remaining = seconds + " seconds"
    }

    return remaining + " ago"
  }
}

export default TimeFormatting;