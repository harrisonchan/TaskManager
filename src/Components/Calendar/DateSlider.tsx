import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

interface DateSliderProps {
  selectedMonth?: dayjs.Dayjs
}

const DateSlider: React.FC<DateSliderProps> = (props) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  useEffect(() => {
    props.selectedMonth && setSelectedMonth(props.selectedMonth)
  }, [selectedMonth])
  return (
    <>
      <Text>{selectedMonth.format('MMMM YYYY')}</Text>
    </>
  )
}

export default DateSlider
