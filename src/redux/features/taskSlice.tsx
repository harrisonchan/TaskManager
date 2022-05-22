import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs'

export type TaskType = {
  taskId: number
  taskTitle: string
  taskDescription: string
  taskDueDates: string[]
  taskCompletionDate: string | undefined
  taskReminderDates: string[]
  taskIsComplete: boolean
}

interface TaskState {
  tasks: TaskType[]
}

const initialState = {
  tasks: [],
} as TaskState

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Omit<TaskType, 'taskId'>>) {
      // const taskDueDates = action.payload.taskDueDates.map((dueDate) => dayjs(dueDate).toString())
      // const taskCompletionDate = dayjs(action.payload.taskCompletionDate).toString()
      // const taskReminderDates = action.payload.taskReminderDates.map((taskReminderDates) => dayjs(taskReminderDates).toString())
      // const task = {
      //   taskTitle: action.payload.taskTitle,
      //   taskDescription: action.payload.taskDescription,
      //   taskCompletionDate,
      //   taskDueDates,
      //   taskReminderDates,
      // }
      //Why do arrays start at 0?!?!?!?!?!?!
      state.tasks.push({ taskId: state.tasks.length == 0 ? 0 : state.tasks.length, ...action.payload })
    },
    setTaskTitle(
      state,
      action: PayloadAction<
        Omit<
          TaskType,
          'taskDescription' | 'taskDueDates' | 'taskCompletionDate' | 'taskReminderDates' | 'taskIsComplete'
        >
      >
    ) {
      state.tasks[action.payload.taskId].taskTitle = action.payload.taskTitle
    },
    setTaskDescription(
      state,
      action: PayloadAction<
        Omit<TaskType, 'taskTitle' | 'taskDueDates' | 'taskCompletionDate' | 'taskReminderDates' | 'taskIsComplete'>
      >
    ) {
      state.tasks[action.payload.taskId].taskDescription = action.payload.taskDescription
    },
    setTaskDueDates(
      state,
      action: PayloadAction<
        Omit<TaskType, 'taskTitle' | 'taskDescription' | 'taskCompletionDate' | 'taskReminderDates' | 'taskIsComplete'>
      >
    ) {
      // const taskDueDates = action.payload.taskDueDates.map((dueDate) => dayjs(dueDate).toString())
      state.tasks[action.payload.taskId].taskDueDates = action.payload.taskDueDates
    },
    setTaskCompletionDate(
      state,
      action: PayloadAction<
        Omit<TaskType, 'taskTitle' | 'taskDescription' | 'taskDueDates' | 'taskReminderDates' | 'taskIsComplete'>
      >
    ) {
      // const taskCompletionDate = dayjs(action.payload.taskCompletionDate).toString()
      state.tasks[action.payload.taskId].taskCompletionDate = action.payload.taskCompletionDate
    },
    setTaskReminderDates(
      state,
      action: PayloadAction<
        Omit<TaskType, 'taskTitle' | 'taskDescription' | 'taskDueDates' | 'taskCompletionDate' | 'taskIsComplete'>
      >
    ) {
      // const taskReminderDates = action.payload.taskReminderDates.map((taskReminderDates) => dayjs(taskReminderDates).toString())
      state.tasks[action.payload.taskId].taskReminderDates = action.payload.taskReminderDates
    },
    setTaskComplete(
      state,
      action: PayloadAction<
        Omit<TaskType, 'taskTitle' | 'taskDescription' | 'taskDueDates' | 'taskCompletionDate' | 'taskReminderDates'>
      >
    ) {
      state.tasks[action.payload.taskId].taskIsComplete = action.payload.taskIsComplete
      // state.tasks = updateTasks(state.tasks)
    },
    deleteAllTasks(state) {
      state.tasks = []
    },
  },
})

// Iterates through tasks array and moves completed tasks to bottom
function updateTasks(tasks: TaskType[]) {
  let completedTasks: TaskType[] = []
  let incompleteTasks: TaskType[] = []
  tasks.forEach((task) => {
    if (task.taskIsComplete) {
      completedTasks.push(task)
    } else {
      incompleteTasks.push(task)
    }
  })
  const updatedTasks = incompleteTasks.concat(completedTasks)
  return updatedTasks
}

export default taskSlice
