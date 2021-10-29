import dayjs from 'dayjs'
import React, { useState } from 'react'
import { SCREEN_WIDTH } from '../../utilities/Constants'
import MonthlyCalendar from './MonthlyCalendar'
import { Text, Button, View } from 'react-native'

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
      />
    </View>
  )
}

export default Calendar
