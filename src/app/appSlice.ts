import { createSlice } from "@reduxjs/toolkit"
import { LoginArgs } from "../features/auth/api/authAPI.types"
import { Dispatch } from "redux"
import { authApi } from "../features/auth/api/authAPI"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { clearTasks } from "../features/todolists/model/tasksSlice"
import { clearTodolists } from "../features/todolists/model/todolistsSlice"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },

  reducers: (create) => {
    return {
      changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode
      }),
      setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
        state.status = action.payload.status
      }),
      setAppError: create.reducer<{ error: string | null }>((state, action) => {
        state.error = action.payload.error
      }),
      setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      }),
    }
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: state => state.isLoggedIn,
  }
})

export const { setAppStatus, setAppError, changeTheme, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors
export const appReducer = appSlice.reducer


// export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({status: "loading"}))
//   authApi
//     .login(data)
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatus({status: "succeeded"}))
//         dispatch(setIsLoggedIn({isLoggedIn: true}))
//         localStorage.setItem("sn-token", res.data.data.token)
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }
//
// export const logoutTC = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({status: "loading"}))
//   authApi
//     .logout()
//     .then((res) => {
//       if (res.data.resultCode === ResultCode.Success) {
//         dispatch(setAppStatus({status: "succeeded"}))
//         dispatch(setIsLoggedIn({isLoggedIn: false}))
//         dispatch(clearTasks())
//         dispatch(clearTodolists())
//         localStorage.removeItem("sn-token")
//       } else {
//         handleServerAppError(res.data, dispatch)
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }