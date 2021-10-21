import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs'

interface TaskState {
  tasks: {
    taskId: number
    taskTitle: string
    taskDescription: string
    dueDates: string[]
    completionDate: string | undefined
    reminderDates: string[]
  }[]
}

type TaskActionType = {
  taskId: number
  taskTitle: string
  taskDescription: string
  dueDates: string[]
  completionDate: string | undefined
  reminderDates: string[]
}

const initialState = {
  tasks: [],
} as TaskState

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Omit<TaskActionType, 'taskId'>>) {
      // const dueDates = action.payload.dueDates.map((dueDate) => dayjs(dueDate).toString())
      // const completionDate = dayjs(action.payload.completionDate).toString()
      // const reminderDates = action.payload.reminderDates.map((reminderDates) => dayjs(reminderDates).toString())
      // const task = {
      //   taskTitle: action.payload.taskTitle,
      //   taskDescription: action.payload.taskDescription,
      //   completionDate,
      //   dueDates,
      //   reminderDates,
      // }
      //Why do arrays start at 0?!?!?!?!?!?!
      state.tasks.push({ taskId: state.tasks.length == 0 ? 0 : state.tasks.length, ...action.payload })
    },
    setTaskTitle(
      state,
      action: PayloadAction<Omit<TaskActionType, 'taskDescription' | 'dueDates' | 'completionDate' | 'reminderDates'>>
    ) {
      state.tasks[action.payload.taskId].taskTitle = action.payload.taskTitle
    },
    setTaskDescription(
      state,
      action: PayloadAction<Omit<TaskActionType, 'taskTitle' | 'dueDates' | 'completionDate' | 'reminderDates'>>
    ) {
      state.tasks[action.payload.taskId].taskDescription = action.payload.taskDescription
    },
    setTaskDueDates(
      state,
      action: PayloadAction<Omit<TaskActionType, 'taskTitle' | 'taskDescription' | 'completionDate' | 'reminderDates'>>
    ) {
      // const dueDates = action.payload.dueDates.map((dueDate) => dayjs(dueDate).toString())
      state.tasks[action.payload.taskId].dueDates = action.payload.dueDates
    },
    setTaskCompletionDate(
      state,
      action: PayloadAction<Omit<TaskActionType, 'taskTitle' | 'taskDescription' | 'dueDates' | 'reminderDates'>>
    ) {
      // const completionDate = dayjs(action.payload.completionDate).toString()
      state.tasks[action.payload.taskId].completionDate = action.payload.completionDate
    },
    setTaskReminderDates(
      state,
      action: PayloadAction<Omit<TaskActionType, 'taskTitle' | 'taskDescription' | 'dueDates' | 'completionDate'>>
    ) {
      // const reminderDates = action.payload.reminderDates.map((reminderDates) => dayjs(reminderDates).toString())
      state.tasks[action.payload.taskId].reminderDates = action.payload.reminderDates
    },
  },
})

export default taskSlice
