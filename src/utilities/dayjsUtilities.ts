import dayjs, { Dayjs } from 'dayjs'

const dayjsToString = (dayjsToConvert: Dayjs | Dayjs[]): string | string[] => {
  let convertedDayjs
  if (dayjsToConvert instanceof Array) {
    convertedDayjs = dayjsToConvert.map((dateDayjs) => dayjs(dateDayjs).toString())
  } else {
    convertedDayjs = dayjs(dayjsToConvert).toString()
  }
  return convertedDayjs
}

const dayjsArrayToString = (dayjsArrayToConvert: Dayjs[]) => {
  const convertedDayjsArray = dayjsArrayToConvert.map((item) => dayjs(item).toString())
  return convertedDayjsArray
}

const stringToDayjs = (stringToConvert: string | string[]) => {
  let convertedString
  if (stringToConvert instanceof Array) {
    convertedString = stringToConvert.map((stringDate) => dayjs(stringDate))
  } else {
    convertedString = dayjs(stringToConvert)
  }
  return convertedString
}

export const dayjsUtilities = { dayjsToString, dayjsArrayToString, stringToDayjs }
