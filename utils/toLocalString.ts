import { DateTime } from 'luxon'

export const toLocalString = (utcTime: string) => {
  return DateTime.fromISO(utcTime).toLocaleString(DateTime.DATETIME_SHORT)
}
