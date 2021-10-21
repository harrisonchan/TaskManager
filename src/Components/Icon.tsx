import React from 'react'
import { View } from 'react-native'
import { BookLogo, CheckboxLogo } from '../Assets'

interface IconProps {
  icon: 'book' | 'checkbox'
  width: string | number
  height: string | number
  fill?: string | number
}

const defaultProps: IconProps = {
  icon: 'book',
  width: 40,
  height: 40,
}

export const Icon: React.FC<IconProps> = (props) => {
  return (
    <>
      {props.icon == 'book' && <BookLogo width={props.width} height={props.height} fill={props.fill} />}
      {props.icon == 'checkbox' && <CheckboxLogo width={props.width} height={props.height} fill={props.fill} />}
    </>
  )
}

Icon.defaultProps = defaultProps
