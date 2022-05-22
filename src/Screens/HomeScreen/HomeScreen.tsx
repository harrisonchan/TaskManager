import dayjs from 'dayjs'
import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Button, FlatList } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Styles } from '../../Assets'
import { TextStyles, ColorPalette, DEFAULT_WIDTH } from '../../Assets/Styles'
import { GoalsCard, HabitButton, Icon, TaskList, TaskListItem } from '../../Components'
import { ProgressBar } from '../../Components/ProgessBar'
import { appActions } from '../../redux/features'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { utilityFunctions } from '../../utilities'

const HomeScreen = () => {
  const currentDate = dayjs().format('DD MMMM')
  const count = useAppSelector((state) => state.counter.counterValue)
  const tasks = useAppSelector((state) => state.task.tasks)
  const dispatch = useAppDispatch()
  const insets = useSafeAreaInsets()
  return (
    // <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
    <View style={[Styles.screenContainer, { paddingTop: insets.top }]}>
      <FlatList
        style={{ flex: 1 }}
        data={[]}
        renderItem={() => <></>}
        ListHeaderComponentStyle={Styles.container}
        ListHeaderComponent={
          <>
            {/* <ProgressBar progress={1} total={15} /> */}
            <Text>{currentDate}</Text>
            <View style={Styles.marginBottom20}>
              <View style={[Styles.marginBottom10, { flexDirection: 'row' }]}>
                <Text style={[TextStyles.title3, { flex: 1 }]}>My Goals</Text>
                <TouchableOpacity>
                  <Text style={TextStyles.body}>See All</Text>
                </TouchableOpacity>
              </View>
              <GoalsCard progress={5} maxProgress={30} title="Gym daily" />
            </View>
            <View style={{ flexDirection: 'row', width: DEFAULT_WIDTH }}>
              <Text style={[TextStyles.title3, { flex: 1 }]}>My Habits</Text>
              <TouchableOpacity>
                <Text style={TextStyles.body}>1/3</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{ flexDirection: 'row' }}>
          <Text style={[TextStyles.title3, { flex: 1 }]}>My Habits</Text>
          <TouchableOpacity>
            <Text style={TextStyles.body}>1/3</Text>
          </TouchableOpacity>
        </View> */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={[{ height: verticalScale(70) }, Styles.marginBottom20]}
              ListHeaderComponentStyle={[Styles.marginLeft10, Styles.container]}
              ListHeaderComponent={
                <View>
                  <HabitButton
                    title="New Habit"
                    icon="plus"
                    iconFill={ColorPalette.darkGray}
                    buttonColor="#FFFFFF"
                    containerStyle={[Styles.marginLeft10, Styles.marginRight10]}
                  />
                </View>
              }
              data={[{}]}
              renderItem={() => (
                <>
                  <HabitButton
                    title="Read books"
                    containerStyle={[Styles.marginLeft10, Styles.marginRight10]}
                    progressValue={0.25}
                  />
                  <HabitButton
                    title="Read books"
                    containerStyle={[Styles.marginLeft10, Styles.marginRight10]}
                    progressValue={0.5}
                  />
                  <HabitButton
                    title="Read books"
                    containerStyle={[Styles.marginLeft10, Styles.marginRight10]}
                    progressValue={0.75}
                  />
                  <HabitButton
                    title="Read books"
                    containerStyle={[Styles.marginLeft10, Styles.marginRight10]}
                    progressValue={1}
                  />
                </>
              )}
            />
            <Text style={[TextStyles.title3]}>Today</Text>
            <TaskList />
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
                    taskDueDates: utilityFunctions.dayjsUtilities.dayjsArrayToString([dayjs(), dayjs()]),
                    taskCompletionDate: undefined,
                    taskReminderDates: [],
                    taskIsComplete: false,
                  })
                )
                // console.log(tasks)
              }}
            />
            <Button
              title="add new completed task"
              onPress={() => {
                dispatch(
                  appActions.taskActions.addTask({
                    taskTitle: 'task title bitch',
                    taskDescription: 'task description bitch',
                    taskDueDates: utilityFunctions.dayjsUtilities.dayjsArrayToString([dayjs(), dayjs()]),
                    taskCompletionDate: undefined,
                    taskReminderDates: [],
                    taskIsComplete: true,
                  })
                )
                // console.log(tasks)
              }}
            />
            <Button
              title="set task title task 0"
              onPress={() => {
                dispatch(
                  appActions.taskActions.setTaskTitle({
                    taskId: 0,
                    taskTitle: 'This is the task title for task 0 woohoo!!!',
                  })
                )
                // console.log(tasks)
              }}
            />
            <Button
              title="set task due date task 0"
              onPress={() => {
                dispatch(
                  appActions.taskActions.setTaskDueDates({
                    taskId: 0,
                    taskDueDates: utilityFunctions.dayjsUtilities.dayjsArrayToString([dayjs()]),
                  })
                )
                // console.log(tasks)
              }}
            />
            <Button title="console log tasks" onPress={() => console.log(tasks)} />
            <Button title="delete all tasks" onPress={() => dispatch(appActions.taskActions.deleteAllTasks())} />
          </>
        }
      />
    </View>
  )
}

export default HomeScreen
