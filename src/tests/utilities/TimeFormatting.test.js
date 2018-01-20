import TimeFormatting from './../../utilities/TimeFormatting';
import moment from 'moment'

it('TimeFormatting: prettyTimeRemaining returns null if info not provided', () => {
  const timeformatting = TimeFormatting.prettyTimeRemaining()
  expect(timeformatting).toBe(null)
})

it('TimeFormatting: prettyTimeRemaining returns time remaining from now if only end is provided', () => {
  let start = "2018-01-21"
  const timeformatting = TimeFormatting.prettyTimeRemaining(start)
  expect(timeformatting).not.toBe(null)
})

it('TimeFormatting: prettyTimeRemaining returns time remaining from start if start and end are provided (days)', () => {
  let start = "2018-01-15"
  let end = "2018-02-01"
  const timeformatting = TimeFormatting.prettyTimeRemaining(end, start)
  expect(timeformatting).toBe("17 days")
})

it('TimeFormatting: prettyTimeRemaining returns time remaining from start if start and end are provided (hours)', () => {
  let start = "2018-01-15 12:00:00"
  let end = "2018-01-15 14:02:00"
  const timeformatting = TimeFormatting.prettyTimeRemaining(end, start)
  expect(timeformatting).toBe("2 hours")
})

it('TimeFormatting: prettyTimeRemaining returns time remaining from start if start and end are provided (minutes)', () => {
  let start = "2018-01-15 12:00:00"
  let end = "2018-01-15 12:05:00"
  const timeformatting = TimeFormatting.prettyTimeRemaining(end, start)
  expect(timeformatting).toBe("5 minutes")
})

it('TimeFormatting: prettyTimeRemaining returns valid time for point in the past', () => {
  let start = "2018-01-15 12:05:00"
  let end = "2018-01-15 12:00:00"
  const timeformatting = TimeFormatting.prettyTimeRemaining(end, start)
  expect(timeformatting).toBe("0 seconds")
})