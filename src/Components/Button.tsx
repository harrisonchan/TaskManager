import React from 'react'
import { Text, View, TouchableWithoutFeedback, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import { Styles } from '../Assets'
import { TextStyles } from '../Assets/Styles'

interface ButtonProps extends Omit<TouchableOpacityProps, 'onPress' | 'style'> {
  onPress?: () => void
  buttonText?: string
  buttonType?: 'wide' | 'default'
  buttonStyle?: ViewStyle
  // style?: ViewStyle | ViewStyle[]
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={[props.buttonType == 'wide' ? Styles.wideButton : Styles.defaultButton, Styles.button, props.buttonStyle]}>
      {/* {props.children} */}
      <Text style={TextStyles.subhead}>{props.buttonText}</Text>
    </TouchableOpacity>
  )
}
