import counterSlice from './counterSlice'
import taskSlice from './taskSlice'

export const counterReducer = counterSlice.reducer
export const taskReducer = taskSlice.reducer

const counterActions = counterSlice.actions
const taskActions = taskSlice.actions

export const appActions = {
  counterActions,
  taskActions,
}
