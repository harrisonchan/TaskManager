import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { ColorPalette, Styles } from '../Assets'
import { Icon } from './Icon'

interface TaskListItemProps {
  taskName: string
}

const defaultProps: TaskListItemProps = {
  taskName: 'New Task',
}

export const TaskListItem: React.FC<TaskListItemProps> = (props) => {
  const [completed, setCompleted] = useState(false)
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* <TouchableHighlight>
        <Icon icon="checkbox" width={32} height={32} />
      </TouchableHighlight> */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setCompleted(!completed)}
        style={[
          Styles.marginRight10,
          {
            width: moderateScale(25),
            height: moderateScale(25),
            borderRadius: 100,
            borderWidth: 2,
            borderColor: completed ? ColorPalette.primaryColor : ColorPalette.lightGray,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        {completed && (
          <View
            style={{ width: '80%', height: '80%', backgroundColor: ColorPalette.primaryColor, borderRadius: 100 }}
          />
        )}
      </TouchableOpacity>

      <Text numberOfLines={3}>{props.taskName}</Text>
    </View>
  )
}

TaskListItem.defaultProps = defaultProps
