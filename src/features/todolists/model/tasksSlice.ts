import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { Dispatch } from "redux"
import { setAppStatus } from "../../../app/appSlice"
import { RootState } from "../../../app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, DomainTodolist, removeTodolist } from "./todolistsSlice"
// import { AddTodolistActionType, RemoveTodolistActionType } from "./todolistsSlice"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const taskIndex = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (taskIndex > -1) {
        tasks.splice(taskIndex, 1)
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    }),
    updateTask: create.reducer<{taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = {
          ...tasks[index],
          ...action.payload.domainModel
        }
      }
    }),
    clearTasks: create.reducer((state, action) => {
      return {}
    }),
  }),
  selectors: {
    selectTasks: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
      state[action.payload.todolist.id] = []
    })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const {updateTask, removeTask, addTask, setTasks, clearTasks} = tasksSlice.actions
export const {selectTasks} = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer


// Thunks
// export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({status: "loading"}))
//   tasksApi
//     .getTasks(todolistId)
//     .then((res) => {
//       dispatch(setAppStatus({status: "succeeded"}))
//       dispatch(setTasks({ todolistId, tasks: res.data.items }))
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({status: "loading"}))
//   tasksApi
//     .deleteTask(arg)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatus({status: "succeeded"}))
//         dispatch(removeTask({ todolistId: arg.todolistId, taskId: arg.taskId }))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({status: "loading"}))
//   tasksApi
//     .createTask(arg)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatus({status: "succeeded"}))
//         dispatch(addTask({ task: res.data.data.item }))
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// export const updateTaskTC =
//   (arg: { taskId: string; todolistId: string; domainModel: UpdateTaskDomainModel }) =>
//   (dispatch: Dispatch, getState: () => RootState) => {
//     const { taskId, todolistId, domainModel } = arg
//
//     const allTasksFromState = getState().tasks
//     const tasksForCurrentTodolist = allTasksFromState[todolistId]
//     const task = tasksForCurrentTodolist.find((t) => t.id === taskId)
//
//     if (task) {
//       const model: UpdateTaskModel = {
//         status: task.status,
//         title: task.title,
//         deadline: task.deadline,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//         ...domainModel,
//       }
//
//       dispatch(setAppStatus({status: "loading"}))
//       tasksApi
//         .updateTask({ taskId, todolistId, model })
//         .then((res) => {
//           if (res.data.resultCode === ResultCode.Success) {
//             dispatch(setAppStatus({status: "succeeded"}))
//             dispatch(updateTask({ taskId, todolistId, domainModel: model }))
//           } else {
//             handleServerAppError(res.data, dispatch)
//           }
//         })
//         .catch((error) => {
//           handleServerNetworkError(error, dispatch)
//         })
//     }
//   }


