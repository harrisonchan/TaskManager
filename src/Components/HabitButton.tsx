import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { ColorPalette } from '../Assets'
import Styles, { TextStyles } from '../Assets/Styles'
import { Icon } from './Icon'

interface HabitButtonProps {
  title: String
}

export const HabitButton: React.FC<HabitButtonProps> = (props) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor: ColorPalette.lightGray,
          borderRadius: 15,
          height: moderateScale(60),
          width: moderateScale(60),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#ffadad',
            height: '92%',
            width: '92%',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon icon="book" width={moderateScale(40)} height={moderateScale(40)} />
        </View>
      </TouchableOpacity>
      <Text style={[TextStyles.body, TextStyles.darkGray]}>{props.title}</Text>
    </View>
  )
}
