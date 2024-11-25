import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { tasksApi } from "../features/todolists/api/tasksApi"
import { todolistsApi } from "../features/todolists/api/todolistsApi"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "dark" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false
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
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: state => state.isLoggedIn
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