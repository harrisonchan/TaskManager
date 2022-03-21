import React, { FC } from 'react'
import { Text, TouchableOpacity, ViewStyle, StyleSheet, TextStyle, Animated, TouchableOpacityProps } from 'react-native'
import { moderateVerticalScale } from 'react-native-size-matters'
import { ColorPalette } from '../Assets'
import { SCREEN_WIDTH } from '../utilities/Constants'
// import { ColorPalette } from '../commons/ColorPalette'
// import { SCREEN_WIDTH } from '../commons/Constants'
// import { TextStyles } from '../commons/TextStyles'

export interface ButtonProps extends Omit<TouchableOpacityProps, 'onPress' | 'style'> {
  onPress?: () => void
  mode?: 'default' | 'outline' | 'cancel'
  label: string
  labelStyle?: TextStyle
  style?: ViewStyle | ViewStyle[]
}

export const Button1: FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress !== undefined && props.onPress()
      }}
      activeOpacity={0.75}
      {...props}
      style={[
        props.mode === 'default'
          ? styles.defaultContainer
          : props.mode === 'outline'
          ? styles.outlineContainer
          : props.mode === 'cancel'
          ? styles.cancelContainer
          : styles.defaultContainer,
        props.style,
      ]}>
      <Text
        style={[
          //   TextStyles.Buttons,
          //   {
          //     color:
          //       props.mode === 'default'
          //         ? 'white'
          //         : props.mode === 'outline'
          //         ? ColorPalette.Blue
          //         : props.mode === 'cancel'
          //         ? ColorPalette.Red
          //         : 'white',
          //   },
          props.labelStyle,
        ]}>
        {props.label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  defaultContainer: {
    width: SCREEN_WIDTH * 0.88,
    height: moderateVerticalScale(50, 0.4),
    borderRadius: 20,
    backgroundColor: ColorPalette.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineContainer: {
    width: SCREEN_WIDTH * 0.88,
    height: moderateVerticalScale(50, 0.4),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: ColorPalette.lightBlue,
  },
  cancelContainer: {
    width: SCREEN_WIDTH * 0.88,
    height: moderateVerticalScale(50, 0.4),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: ColorPalette.fireOpal,
  },
})
