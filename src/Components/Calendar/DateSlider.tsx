import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { TouchableOpacity, View, ViewStyle, Text, RegisteredStyle } from 'react-native'
import { TextStyles } from '../../Assets'

interface MonthlyDateSliderProps {
  selectedMonth?: dayjs.Dayjs
  onPressPrevious?: () => void
  onPressNext?: () => void
  onPressDate?: () => void
  isSelectingMonth?: boolean
  containerStyle?: ViewStyle | ViewStyle[] | RegisteredStyle<ViewStyle> | RegisteredStyle<ViewStyle>[]
}

export const MonthlyDateSlider: React.FC<MonthlyDateSliderProps> = (props) => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs())
  useEffect(() => {
    props.selectedMonth && setSelectedMonth(props.selectedMonth)
  }, [selectedMonth, props.selectedMonth])
  return (
    <View
      style={[{ flexDirection: 'row', justifyContent: 'space-between' }, props.containerStyle && props.containerStyle]}>
      <TouchableOpacity onPress={props.onPressPrevious}>
        <Text style={TextStyles.subhead}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressDate}>
        <Text style={TextStyles.subhead}>
          {props.isSelectingMonth ? selectedMonth.format('YYYY') : selectedMonth.format('MMMM YYYY')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressNext}>
        <Text style={TextStyles.subhead}>Next</Text>
      </TouchableOpacity>
    </View>
  )
}
