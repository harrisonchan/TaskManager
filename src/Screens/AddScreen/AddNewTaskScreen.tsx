import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, TextInput, ScrollView, View, TouchableOpacity } from 'react-native'
import { Styles } from '../../Assets'
import { ICON_DIMENSIONS, TextStyles } from '../../Assets/Styles'
import { Button, Icon } from '../../Components'
import { useAppDispatch } from '../../redux'
import { appActions } from '../../redux/features'

const NewTaskScreen = () => {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskCategory, setTaskCategory] = useState('')
  const [taskDueDate, setTaskDueDate] = useState([])
  const [taskReminderDates, setTaskReminderDates] = useState([])
  // useEffect(() => {
  //   console.log('Title:', taskTitle)
  //   console.log('Description:', taskDescription)
  // }, [taskTitle, taskDescription])
  const dispatch = useAppDispatch()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[{ flexGrow: 1 }, Styles.container]} keyboardDismissMode="on-drag">
        <Text style={TextStyles.title2}>Create a New Task</Text>
        <TextInput placeholder="Task Title" onChangeText={(input) => setTaskTitle(input)} />
        <TextInput placeholder="Task Description" onChangeText={(input) => setTaskDescription(input)} />
        <Text>Category/Tag</Text>
        <View style={[Styles.flexRow, Styles.centerContainer]}>
          <Icon icon="book" height={ICON_DIMENSIONS.SMALL} width={ICON_DIMENSIONS.SMALL} />
          <TouchableOpacity>
            <Text style={[TextStyles.body, Styles.marginLeft10]}>Due Date</Text>
          </TouchableOpacity>
        </View>
        <Text>Repeat</Text>
        <Text>Reminder</Text>
        <Button
          buttonText="Add New Task"
          buttonType="wide"
          onPress={() =>
            dispatch(
              appActions.taskActions.addTask({
                taskTitle: taskTitle,
                taskDescription: taskDescription,
                taskCompletionDate: undefined,
                taskDueDates: taskDueDate,
                taskReminderDates: taskReminderDates,
                taskIsComplete: false,
              })
            )
          }
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default NewTaskScreen
