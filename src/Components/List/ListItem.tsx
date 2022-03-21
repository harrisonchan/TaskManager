import React from 'react'
import { View, Text } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { ColorPalette } from '../../Assets'
import { DEFAULT_WIDTH } from '../../utilities/Constants'
import { Icon, iconType } from '../Icon'

interface ListItemProps {
  itemText: string
  itemSecondaryText?: string
  itemIcon: iconType
  // Implement navigation props
}

const ListItem: React.FC<ListItemProps> = (props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', width: DEFAULT_WIDTH, padding: moderateScale(5) }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Icon icon={props.itemIcon} height={moderateScale(30)} width={moderateScale(30)} />
        <Text style={{ marginLeft: moderateScale(10) }}>{props.itemText}</Text>
      </View>
      <Text style={{ marginRight: moderateScale(6) }}>{props.itemSecondaryText}</Text>
      <Icon icon="chevron-right" height={moderateScale(30)} width={moderateScale(30)} fill={ColorPalette.lightGray} />
    </View>
  )
}

export default ListItem
