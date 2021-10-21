import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import React, { ReactNode, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
dayjs.extend(localeData)

interface MonthlyCalendarItemProps {
  title?: string | number
  itemWidth: number
  itemHeight: number
  itemValue?: dayjs.Dayjs
  testProp?: boolean
}

const MonthlyCalendarItem: React.FC<MonthlyCalendarItemProps> = (props) => {
  return (
    <View
      style={{
        height: props.itemHeight,
        width: props.itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {props.children}
      <Text style={props.testProp && { color: 'red' }}>{props.title}</Text>
    </View>
  )
}

interface MonthlyCalendarProps {
  width: number
  height: number
  selectedMonth?: dayjs.Dayjs
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = (props) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  const [selectedMonthDateView, setSelectedMonthDateView] = useState<ReactNode[]>([])

  //Weekdays Header (Sun, Mon, Tue, etc.)
  let weekdaysHeader = dayjs
    .weekdaysMin()
    .map((weekday, i) => (
      <MonthlyCalendarItem
        key={weekday}
        title={weekday.split('')[0]}
        itemWidth={props.width / 7}
        itemHeight={props.height / 7}
      />
    ))

  useEffect(() => {
    props.selectedMonth && setSelectedMonth(props.selectedMonth)
    const numberOfDaysInSelectedMonth = selectedMonth.daysInMonth()
    const selectedMonth1stDayOfWeek = selectedMonth.startOf('month').day()
    setSelectedMonthDateView([])

    //Add filters for days of week before 1st day in month
    for (let i = 0; i < selectedMonth1stDayOfWeek; i++) {
      setSelectedMonthDateView((prevState) => [
        ...prevState,
        <MonthlyCalendarItem key={-i} itemWidth={props.width / 7} itemHeight={props.height / 7} />,
      ])
    }
    for (let i = 1; i <= numberOfDaysInSelectedMonth; i++) {
      let dateOfMonth = selectedMonth.date(i)
      setSelectedMonthDateView((prevState) => [
        ...prevState,
        <MonthlyCalendarItem
          key={i}
          title={i}
          itemWidth={props.width / 7}
          itemHeight={(props.height / 7) * 1}
          itemValue={dateOfMonth}
        />,
      ])
    }

    //Change Array Element Example
    const dateToHighlight = 29
    if (dateToHighlight <= numberOfDaysInSelectedMonth) {
      setSelectedMonthDateView((prevState) => [
        ...prevState.slice(0, selectedMonth1stDayOfWeek + (dateToHighlight - 1)),
        <MonthlyCalendarItem
          key={dateToHighlight}
          title={dateToHighlight}
          itemWidth={props.width / 7}
          itemHeight={(props.height / 7) * 1}
          itemValue={selectedMonth.date(selectedMonth1stDayOfWeek)}
          testProp
        />,
        ...prevState.slice(selectedMonth1stDayOfWeek + 1 + (dateToHighlight - 1)),
      ])
    }
  }, [selectedMonth])

  return (
    <View style={{ alignItems: 'stretch' }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: props.width,
          height: props.height,
        }}>
        {weekdaysHeader}
        {selectedMonthDateView}
      </View>
    </View>
  )
}

export default MonthlyCalendar
