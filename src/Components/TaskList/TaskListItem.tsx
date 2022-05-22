import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Styles } from '../../Assets'
import { useAppDispatch } from '../../redux'
import { appActions } from '../../redux/features'
import { TaskType } from '../../redux/features/taskSlice'
import { Checkbox } from '../Checkbox'

interface TaskListItemProps {
  task: TaskType
}

export const TaskListItem: React.FC<TaskListItemProps> = (props) => {
  const [taskIsComplete, setTaskIsComplete] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    setTaskIsComplete(props.task.taskIsComplete)
  }, [])
  useEffect(() => {
    dispatch(appActions.taskActions.setTaskComplete({ taskId: props.task.taskId, taskIsComplete: taskIsComplete }))
  }, [taskIsComplete])
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Checkbox size="small" onPress={(e) => setTaskIsComplete(e)} isChecked={taskIsComplete} />
      <TouchableOpacity>
        <Text numberOfLines={3} style={Styles.marginLeft10}>
          {props.task.taskTitle}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
