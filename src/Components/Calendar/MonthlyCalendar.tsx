import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import React, { ReactNode, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { onChange } from 'react-native-reanimated'
dayjs.extend(localeData)

interface MonthlyDateSliderProps {
  selectedMonth: dayjs.Dayjs
  onPressPrevious?: () => void
  onPressNext?: () => void
  onPressDate?: () => void
  isSelectingMonth?: boolean
  // onChangeMonth?: (selectedMonth: dayjs.Dayjs) => void
}

const MonthlyDateSlider: React.FC<MonthlyDateSliderProps> = (props) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  useEffect(() => {
    props.selectedMonth && setSelectedMonth(props.selectedMonth)
  }, [selectedMonth, props.selectedMonth])
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={props.onPressPrevious}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressDate}>
        <Text>{props.isSelectingMonth ? selectedMonth.format('YYYY') : selectedMonth.format('MMMM YYYY')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressNext}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

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
  onChangeMonth: (selectedMonth: dayjs.Dayjs) => void
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = (props) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  const [selectedMonthDateView, setSelectedMonthDateView] = useState<ReactNode[]>([])
  const [isSelectingMonth, setIsSelectingMonth] = useState(false)

  //Weekdays Header (Sun, Mon, Tue, etc.)
  let weekdaysHeader = dayjs
    .weekdaysMin()
    .map((weekday, i) => (
      <MonthlyCalendarItem
        key={weekday}
        title={weekday.split('')[0]}
        itemWidth={props.width / 7}
        itemHeight={props.height / 6}
      />
    ))

  let monthsSelectionView = dayjs.monthsShort().map((month, i) => (
    <TouchableOpacity
      key={month}
      style={{
        width: props.width / 4,
        height: props.height / 3,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        props.onChangeMonth(selectedMonth.month(i))
        setIsSelectingMonth(false)
      }}>
      <Text>{month}</Text>
    </TouchableOpacity>
  ))

  // useEffect(() => {}, [{}])

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
          itemHeight={props.height / 6}
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
          itemHeight={props.height / 6}
          itemValue={selectedMonth.date(selectedMonth1stDayOfWeek)}
          testProp
        />,
        ...prevState.slice(selectedMonth1stDayOfWeek + 1 + (dateToHighlight - 1)),
      ])
    }
  }, [selectedMonth, props.selectedMonth])

  return (
    <View style={{ alignItems: 'stretch' }}>
      <MonthlyDateSlider
        selectedMonth={selectedMonth}
        onPressPrevious={() =>
          isSelectingMonth
            ? props.onChangeMonth(selectedMonth.add(-12, 'M'))
            : props.onChangeMonth(selectedMonth.add(-1, 'M'))
        }
        onPressNext={() =>
          isSelectingMonth
            ? props.onChangeMonth(selectedMonth.add(12, 'M'))
            : props.onChangeMonth(selectedMonth.add(1, 'M'))
        }
        onPressDate={() => setIsSelectingMonth(!isSelectingMonth)}
        isSelectingMonth={isSelectingMonth}
      />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: props.width,
          height: props.height,
        }}>
        {isSelectingMonth ? (
          <>{monthsSelectionView}</>
        ) : (
          <>
            {weekdaysHeader}
            {selectedMonthDateView}
          </>
        )}
      </View>
    </View>
  )
}

export default MonthlyCalendar
