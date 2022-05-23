import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { ColorPalette, Styles } from '../Assets'
import { COMPONENT_WIDTH1, TextStyles } from '../Assets/Styles'
import { Icon, iconType } from './Icon'
import { ProgressBar } from './ProgessBar'

interface GoalsCardInterface {
  title: string
  progress: number
  maxProgress: number
  icon?: iconType
}

export const GoalsCard: React.FC<GoalsCardInterface> = (props) => {
  return (
    <TouchableOpacity style={[Styles.cardContainer, { backgroundColor: ColorPalette.secondaryColor }]}>
      <View style={{ flex: 1 }}>
        <Text style={[TextStyles.subhead, TextStyles.white]}>{props.title}</Text>
        <Text style={[TextStyles.body, TextStyles.transparentGray, { flex: 1 }]}>20/40 Missions</Text>
        <ProgressBar
          progress={props.progress}
          maxProgress={props.maxProgress}
          width={COMPONENT_WIDTH1 * 0.6}
          height={moderateScale(7)}
          maxProgressOpacity={0.5}
          showPercentage
          percentagePosition="right"
          percentageStyle={[TextStyles.subhead, TextStyles.white, { marginBottom: moderateScale(5) }]}
        />
      </View>
      <View
        style={{
          marginTop: moderateScale(15),
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          overflow: 'hidden',
        }}>
        <Icon icon="illustration-sports" height={moderateScale(90)} width={moderateScale(90)} />
      </View>
    </TouchableOpacity>
  )
}
