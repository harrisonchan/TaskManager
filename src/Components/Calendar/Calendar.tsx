import dayjs from 'dayjs'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Styles } from '../../Assets'
import { MonthlyDateSlider } from './DateSlider'
import { MonthlyCalendar } from './MonthlyCalendar'

interface CalendarProps {
  calendarMode: 'weekly' | 'monthly'
  dimensions: number
  initialDate: dayjs.Dayjs
}

export const Calendar: React.FC<CalendarProps> = (props) => {
  const [date, setDate] = useState(props.initialDate)
  return (
    <>
      {props.calendarMode == 'monthly' ? (
        <View
          style={{
            width: props.dimensions,
            height: props.dimensions,
            justifyContent: 'center',
            backgroundColor: 'beige',
          }}>
          <MonthlyDateSlider
            containerStyle={Styles.marginBottom5}
            selectedMonth={date}
            onPressNext={() => setDate(dayjs(date).add(1, 'month'))}
            onPressPrevious={() => setDate(dayjs(date).subtract(1, 'month'))}
          />
          <MonthlyCalendar dimensions={props.dimensions} date={date} onChangeDate={(e) => setDate(e)} />
        </View>
      ) : (
        <></>
      )}
    </>
  )
}
