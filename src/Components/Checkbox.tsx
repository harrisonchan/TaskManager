import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ColorPalette, ICON_DIMENSIONS } from '../Assets'
import { Icon } from './Icon'

interface CheckboxProps {
  size: 'small' | 'medium' | 'large'
  isChecked: boolean
  onPress?: (isChecked: boolean) => void
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const [size, setSize] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  useEffect(() => {
    props.size == 'small'
      ? setSize(ICON_DIMENSIONS.SMALL)
      : props.size == 'medium'
      ? setSize(ICON_DIMENSIONS.MEDIUM)
      : setSize(ICON_DIMENSIONS.LARGE)
    setIsChecked(props.isChecked)
  }, [])
  useEffect(() => {
    props.onPress && props.onPress(isChecked)
  }, [isChecked])
  return (
    <>
      <TouchableOpacity
        style={{
          width: size,
          height: size,
          borderColor: ColorPalette.primaryColor,
          borderWidth: 2,
          borderRadius: 4,
          backgroundColor: isChecked ? ColorPalette.primaryColor : 'transparent',
        }}
        onPress={() => {
          setIsChecked(!isChecked)
        }}>
        {isChecked && (
          <Icon icon="check" width={size * 0.85} height={size * 0.85} fill="white" stroke="white" strokeWidth={2} />
        )}
      </TouchableOpacity>
    </>
  )
}
