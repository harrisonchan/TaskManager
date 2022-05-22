import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
  RegisteredStyle,
  ColorValue,
  StyleProp,
} from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { ColorPalette } from '../Assets'
import Styles, { TextStyles } from '../Assets/Styles'
import { Icon, iconType } from './Icon'

interface HabitButtonProps {
  title: string
  progressValue?: number
  containerStyle?: ViewStyle[] | ViewStyle | RegisteredStyle<ViewStyle>[] | RegisteredStyle<ViewStyle>
  icon?: iconType
  iconFill?: ColorValue
  buttonColor?: ColorValue
}

export const HabitButton: React.FC<HabitButtonProps> = (props) => {
  // For now for bg color we'll just randomize it
  const [buttonColor, setButtonColor] = useState(props.buttonColor ? props.buttonColor : '')
  useEffect(() => {
    if (buttonColor == '') {
      let random = Math.random()
      if (random <= 0.33) {
        setButtonColor(ColorPalette.primaryColor)
      } else if (random <= 0.66) {
        setButtonColor(ColorPalette.secondaryColor)
      } else {
        setButtonColor(ColorPalette.tertiaryColor)
      }
    }
    // // calculate border color based on progress
    // if (props.progressValue) {

    // }
  }, [])
  useEffect(() => {}, [{}])
  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, Styles.marginTop10, props.containerStyle]}>
      <TouchableOpacity
        style={[
          {
            borderWidth: 2.5,
            borderColor: ColorPalette.transparentGray,
            borderRadius: 15,
            height: moderateScale(60),
            width: moderateScale(60),
            alignItems: 'center',
            justifyContent: 'center',
            // borderLeftColor: props.progressValue && props.progressValue >= 0.25 && buttonColor,
            // borderBottomColor: props.progressValue && props.progressValue >= 0.5 && buttonColor,
            // borderRightColor: props.progressValue && props.progressValue >= 0.75 && buttonColor,
            // borderTopColor: props.progressValue && props.progressValue >= 0.9 && buttonColor,
          },
        ]}>
        <View
          style={{
            backgroundColor: buttonColor,
            height: '92%',
            width: '92%',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            icon={props.icon ? props.icon : 'book'}
            width={moderateScale(40)}
            height={moderateScale(40)}
            fill={props.iconFill}
          />
        </View>
      </TouchableOpacity>
      <Text style={[TextStyles.body, TextStyles.darkGray]}>{props.title}</Text>
    </View>
  )
}
