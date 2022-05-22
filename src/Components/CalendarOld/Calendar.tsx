import dayjs from 'dayjs'
import React, { useState } from 'react'
import MonthlyCalendar from './MonthlyCalendar'
import { Text, Button, View } from 'react-native'
import { SCREEN_WIDTH } from '../../Assets'

interface CalendarProps {
  calendarDimensions?: number
  selectedMonth?: dayjs.Dayjs
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const [dimensions, setDimensions] = useState(props.calendarDimensions ? props.calendarDimensions : SCREEN_WIDTH)
  const [selectedMonth, setSelectedMonth] = useState(props.selectedMonth ? props.selectedMonth : dayjs())
  return (
    <View>
      <MonthlyCalendar
        selectedMonth={selectedMonth}
        width={dimensions}
        height={dimensions}
        onChangeMonth={(selectedMonth) => setSelectedMonth(selectedMonth)}
        dateSliderContainerStyle={{ width: dimensions }}
      />
    </View>
  )
}

export default Calendar
