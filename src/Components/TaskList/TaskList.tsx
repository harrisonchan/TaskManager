import React from 'react'
import { View, FlatList } from 'react-native'
import { Styles } from '../../Assets'
import { useAppSelector } from '../../redux'
import { TaskListItem } from './TaskListItem'

interface TaskListProps {
  // tasks: TaskType[]
}

const defaultProps: TaskListProps = {
  // tasks: [],
}

export const TaskList: React.FC<TaskListProps> = (props) => {
  const tasks = useAppSelector((state) => state.task.tasks)
  return (
    <>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={Styles.marginBottom10}>
            <TaskListItem task={item} />
          </View>
        )}
        keyExtractor={(item) => item.taskId.toString()}
      />
    </>
  )
}

TaskList.defaultProps = defaultProps
