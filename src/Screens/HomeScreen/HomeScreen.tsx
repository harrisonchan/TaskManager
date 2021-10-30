import dayjs from 'dayjs'
import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Button } from 'react-native'
import { GoalsCard, HabitButton } from '../../Components'
import { appActions } from '../../redux/features'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { utilityFunctions } from '../../utilities'

const HomeScreen = () => {
  const currentDate = dayjs().format('DD MMMM')
  const count = useAppSelector((state) => state.counter.counterValue)
  const tasks = useAppSelector((state) => state.task.tasks)
  const dispatch = useAppDispatch()
  return (
    <ScrollView>
      <Text>{currentDate}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1 }}>My Goals</Text>
        <TouchableOpacity>
          <Text>See All</Text>
        </TouchableOpacity>
      </View>
      <GoalsCard />
      <Text>My Habits</Text>
      <HabitButton title="Read books" />
      <Text>Today</Text>
      <Text>Missed Tasks</Text>
      <Text>Tomorrow</Text>
      <Text>For the week</Text>
      <Text>{count}</Text>
      <Button
        title="+"
        onPress={() => {
          dispatch(appActions.counterActions.increment())
        }}
      />
      <Button title="-" onPress={() => dispatch(appActions.counterActions.decrement())} />
      <Button
        title="add new task"
        onPress={() => {
          dispatch(
            appActions.taskActions.addTask({
              taskTitle: 'task title bitch',
              taskDescription: 'task description bitch',
              dueDates: utilityFunctions.dayjsUtilities.dayjsArrayToString([dayjs(), dayjs()]),
              completionDate: undefined,
              reminderDates: [],
            })
          )
          console.log(tasks)
        }}
      />
      <Button
        title="set task title task 0"
        onPress={() => {
          dispatch(
            appActions.taskActions.setTaskTitle({ taskId: 0, taskTitle: 'This is the task title for task 0 woohoo!!!' })
          )
          console.log(tasks)
        }}
      />
      <Button
        title="set task due date task 0"
        onPress={() => {
          dispatch(
            appActions.taskActions.setTaskDueDates({
              taskId: 0,
              dueDates: utilityFunctions.dayjsUtilities.dayjsArrayToString([dayjs()]),
            })
          )
          console.log(tasks)
        }}
      />
    </ScrollView>
  )
}

export default HomeScreen
