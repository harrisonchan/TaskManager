import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { TouchableOpacity, View, ViewStyle, Text, RegisteredStyle } from 'react-native'
import { TextStyles } from '../../Assets'

interface MonthlyDateSliderProps {
  selectedDate: dayjs.Dayjs
  onPressPreviousMonth?: () => void
  onPressNextMonth?: () => void
  onPressPreviousYear?: () => void
  onPressNextYear?: () => void
  onPressDate?: () => void
  onChangeDate?: (date: dayjs.Dayjs) => void
  isSelectingMonth: boolean
  containerStyle?: ViewStyle | ViewStyle[] | RegisteredStyle<ViewStyle> | RegisteredStyle<ViewStyle>[]
}

export const MonthlyDateSlider: React.FC<MonthlyDateSliderProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.selectedDate)
  useEffect(() => {
    props.selectedDate && setSelectedDate(props.selectedDate)
  }, [selectedDate, props.selectedDate])
  return (
    <View
      style={[{ flexDirection: 'row', justifyContent: 'space-between' }, props.containerStyle && props.containerStyle]}>
      <TouchableOpacity
        onPress={() => {
          props.isSelectingMonth
            ? props.onPressPreviousYear && props.onPressPreviousYear()
            : props.onPressPreviousMonth && props.onPressPreviousMonth()
        }}>
        <Text style={TextStyles.subhead}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // setIsSelectingMonth(!isSelectingMonth)
          props.onPressDate && props.onPressDate()
        }}>
        <Text style={TextStyles.subhead}>
          {props.isSelectingMonth ? selectedDate.format('YYYY') : selectedDate.format('MMMM YYYY')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.isSelectingMonth
            ? props.onPressNextYear && props.onPressNextYear()
            : props.onPressNextMonth && props.onPressNextMonth()
        }}>
        <Text style={TextStyles.subhead}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}
