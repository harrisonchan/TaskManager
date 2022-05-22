import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, FlatList } from 'react-native'
import { ColorPalette, TextStyles } from '../../Assets'
import { Button } from '../Button'

dayjs.extend(localeData)

interface MonthlyCalendarItemProps {
  title?: string | number
  itemWidth?: number
  itemHeight?: number
  itemValue?: dayjs.Dayjs
  testProp?: boolean
  selectable: boolean
}

const MonthlyCalendarItem: React.FC<MonthlyCalendarItemProps> = (props) => {
  const [isSelected, setIsSelected] = useState(false)
  return (
    <TouchableOpacity
      style={{
        height: props.itemHeight && props.itemHeight,
        width: props.itemWidth && props.itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected && props.selectable ? ColorPalette.primaryColor : 'transparent',
      }}
      onPress={() => {
        if (props.selectable) {
          setIsSelected(!isSelected)
        }
      }}
      // onPressIn={() => setIsSelected(true)}
      // onPressOut={() => setIsSelected(false)}
      activeOpacity={1}>
      <Text style={[TextStyles.body, props.testProp && { color: 'red' }]}>{props.title}</Text>
    </TouchableOpacity>
  )
}

interface WeekdaysHeaderProps {
  dimensions: number
}

const WeekdaysHeader: React.FC<WeekdaysHeaderProps> = (props) => {
  const weekdays = Array.from(dayjs.weekdaysMin(), (weekday) => weekday[0])
  return (
    <View style={{ width: props.dimensions, backgroundColor: 'orange' }}>
      <FlatList
        horizontal
        scrollEnabled={false}
        style={{ width: props.dimensions }}
        data={weekdays}
        keyExtractor={(weekday, index) => weekday + index.toString()}
        renderItem={({ item, index }) => (
          <MonthlyCalendarItem itemWidth={props.dimensions / 7} title={item} selectable={false} />
        )}
      />
    </View>
  )
}

interface MonthlyViewProps {
  dimensions: number
  date: dayjs.Dayjs
}

const MonthlyView: React.FC<MonthlyViewProps> = (props) => {
  // This is for the key extractor
  const [monthAndYear, setMonthAndYear] = useState(props.date.format('MM-YYYY'))
  const [daysOfMonth, setDaysOfMonth] = useState<string[]>([])
  const updateDaysOfMonth = () => {
    // Get the day of week at which the month starts so we can prepend empties to array
    const month1stDayOfWeek = props.date.startOf('month').day()
    const daysInMonth = props.date.daysInMonth()
    // Get remaining to we can append to fill array to length of 35
    const remainingEmptyDaysOfWeekInMonth = 42 - month1stDayOfWeek - daysInMonth
    let updatedDaysOfMonth: string[] = []
    if (month1stDayOfWeek >= 1) {
      updatedDaysOfMonth = updatedDaysOfMonth.concat(Array(month1stDayOfWeek).fill(''))
    }
    // We use +1 because arrays start at 0 unfortunately.
    updatedDaysOfMonth = updatedDaysOfMonth.concat(Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()))
    if (remainingEmptyDaysOfWeekInMonth >= 1) {
      updatedDaysOfMonth = updatedDaysOfMonth.concat(Array(remainingEmptyDaysOfWeekInMonth).fill(''))
    }
    setDaysOfMonth(updatedDaysOfMonth)
  }
  useEffect(() => {
    updateDaysOfMonth()
  }, [])
  useEffect(() => {
    updateDaysOfMonth()
  }, [props.date])
  return (
    <View style={{ width: props.dimensions, backgroundColor: 'yellow' }}>
      <FlatList
        numColumns={7}
        scrollEnabled={false}
        style={{ width: props.dimensions, flexWrap: 'wrap' }}
        data={daysOfMonth}
        keyExtractor={(item, index) => index.toString() + '.' + item + '-' + monthAndYear}
        renderItem={({ item, index }) => (
          <MonthlyCalendarItem
            title={item}
            itemWidth={props.dimensions / 7}
            itemHeight={props.dimensions / 7}
            selectable={item == '' ? false : true}
          />
          // <></>
        )}
      />
    </View>
  )
}

interface MonthlyCalendarProps {
  dimensions: number
  date: dayjs.Dayjs
}

export const MonthlyCalendar: React.FC<MonthlyCalendarProps> = (props) => {
  const [months, setMonths] = useState([])
  useEffect(() => {
    let newMonthsArr = []
    const startingMonth = 0
  }, [])
  return (
    <View style={{ width: props.dimensions }}>
      <WeekdaysHeader dimensions={props.dimensions} />
      {/* <FlatList
        data={Array(24).fill(0)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <></>}
      /> */}
      <MonthlyView dimensions={props.dimensions} date={props.date} />
    </View>
  )
}
