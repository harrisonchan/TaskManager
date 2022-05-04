import dayjs from 'dayjs'
import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Button, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { Styles } from '../../Assets'
import { TextStyles, ColorPalette } from '../../Assets/Styles'
import { GoalsCard, HabitButton, Icon, TaskListItem } from '../../Components'
import { ProgressBar } from '../../Components/ProgessBar'
import { appActions } from '../../redux/features'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { utilityFunctions } from '../../utilities'

const HomeScreen = () => {
  const currentDate = dayjs().format('DD MMMM')
  const count = useAppSelector((state) => state.counter.counterValue)
  const tasks = useAppSelector((state) => state.task.tasks)
  const dispatch = useAppDispatch()
  return (
    // <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
    <SafeAreaView style={Styles.screenContainer}>
      <ScrollView contentContainerStyle={Styles.container}>
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
        <View style={Styles.marginBottom20}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[TextStyles.title3, { flex: 1 }]}>My Habits</Text>
            <TouchableOpacity>
              <Text style={TextStyles.body}>1/3</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            // style={{ backgroundColor: 'red', height: moderateScale(10) }}
            // ListHeaderComponentStyle={Styles.marginLeft10}
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
            contentContainerStyle={{ height: verticalScale(70) }}
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
        </View>
        <Text style={[TextStyles.title3]}>Today</Text>
        <TaskListItem taskName="task numero 1" />
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
              appActions.taskActions.setTaskTitle({
                taskId: 0,
                taskTitle: 'This is the task title for task 0 woohoo!!!',
              })
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
    </SafeAreaView>
  )
}

export default HomeScreen
