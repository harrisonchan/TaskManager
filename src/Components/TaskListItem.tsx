import React from 'react'
import { View, Text } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { Icon } from './Icon'

interface TaskListItemProps {
  taskName: string
}

const defaultProps: TaskListItemProps = {
  taskName: 'New Task',
}

export const TaskListItem: React.FC<TaskListItemProps> = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableHighlight>
        <Icon icon="checkbox" width={32} height={32} />
      </TouchableHighlight>
      <Text numberOfLines={3}>{props.taskName}</Text>
    </View>
  )
}

TaskListItem.defaultProps = defaultProps
