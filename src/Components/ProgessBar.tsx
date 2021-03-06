import React, { useEffect, useState } from 'react'
import { Text, TextStyle, View, ViewStyle } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { ColorPalette, COMPONENT_WIDTH1 } from '../Assets'

interface ProgressBarProps {
  progress: number
  maxProgress: number
  rounded?: boolean
  width?: number
  height?: number
  progressColor?: string //Need to rewrite this
  maxProgressColor?: string //Need to rewrite this
  maxProgressOpacity?: number
  showPercentage?: boolean
  percentagePosition?: 'left' | 'center' | 'right'
  // percentageStyle?: TextStyle[]
  percentageStyle?: TextStyle[] | any
  containerStyle?: ViewStyle[] | ViewStyle
}

const defaultProps = {
  progress: 1,
  maxProgress: 2,
  rounded: true,
  progressColor: ColorPalette.primaryColor,
  maxProgressColor: ColorPalette.transparentGray,
  // maxProgressOpacity: 0.5,
}

// Not-animated right now...
export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const [percentage, setPercentage] = useState(0)
  useEffect(() => {
    setPercentage(Math.round((props.progress / props.maxProgress) * 100) / 100)
  }, [props])
  return (
    <View style={[props.width ? { width: props.width } : { width: COMPONENT_WIDTH1 }, props.containerStyle]}>
      {props.showPercentage && (
        <Text
          style={[
            props.percentagePosition === 'left'
              ? { alignSelf: 'flex-start' }
              : props.percentagePosition === 'center'
              ? { alignSelf: 'center' }
              : { alignSelf: 'flex-end' },
            props.percentageStyle && props.percentageStyle, //Do we need even need a condition?
          ]}>
          {percentage * 100}%
        </Text>
      )}
      <View>
        <View
          style={[
            props.maxProgressOpacity ? { opacity: props.maxProgressOpacity } : { opacity: 0.5 },
            // props.width ? { width: props.width } : { width: COMPONENT_WIDTH1 },
            { width: '100%' },
            props.height ? { height: props.height } : { height: moderateScale(10) },
            props.rounded && { borderRadius: 10 },
            props.maxProgressColor
              ? { backgroundColor: props.maxProgressColor }
              : { backgroundColor: ColorPalette.primaryColor },
          ]}
        />
        <View
          style={[
            props.width
              ? { width: props.width * (props.progress / props.maxProgress) }
              : { width: COMPONENT_WIDTH1 * (props.progress / props.maxProgress) }, //This code fucking sucks
            props.height ? { height: props.height } : { height: moderateScale(10) },
            props.rounded &&
              (props.progress == props.maxProgress
                ? { borderRadius: 10 }
                : { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }),
            props.progressColor
              ? { backgroundColor: props.progressColor }
              : { backgroundColor: ColorPalette.transparentGray },
            { position: 'absolute' },
          ]}></View>
      </View>
    </View>
  )
}

ProgressBar.defaultProps = defaultProps
