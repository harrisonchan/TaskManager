import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { RegisteredStyle, View, ViewStyle } from 'react-native'
import { MonthlyCalendar } from './MonthlyCalendar'

interface CalendarProps {
  calendarMode: 'weekly' | 'monthly'
  dimensions: number
  initialDate: dayjs.Dayjs
  onChangeDate: (date: dayjs.Dayjs) => void
  style?: ViewStyle | ViewStyle[] | RegisteredStyle<ViewStyle> | RegisteredStyle<ViewStyle>[]
  monthlyCalendarDimensions?: number
  monthlyCalendarDateSelectionViewMonthStyle?: ViewStyle | RegisteredStyle<ViewStyle>
  monthlyCalendarNumMonthstoRender?: number
}

export const Calendar: React.FC<CalendarProps> = (props) => {
  const [date, setDate] = useState(props.initialDate)
  useEffect(() => {
    props.onChangeDate(date)
  }, [date])
  return (
    <>
      {props.calendarMode == 'monthly' ? (
        <View
          style={[
            {
              width: props.dimensions,
              height: props.dimensions,
              justifyContent: 'center',
              alignItems: 'center',
            },
            props.style,
          ]}>
          <MonthlyCalendar
            showDateSlider
            dimensions={props.monthlyCalendarDimensions ? props.monthlyCalendarDimensions : props.dimensions * 0.9}
            date={date}
            onChangeDate={(e) => setDate(e)}
            dateSelectionViewMonthStyle={props.monthlyCalendarDateSelectionViewMonthStyle}
            numMonthsToRender={props.monthlyCalendarNumMonthstoRender ? props.monthlyCalendarNumMonthstoRender : 1}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  )
}
