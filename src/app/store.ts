import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"
import { thunk, ThunkDispatch } from "redux-thunk"
import { appReducer, appSlice } from "./appSlice"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./baseApi"
import { todolistsApi } from "../features/todolists/api/todolistsApi"


export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

// Создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store

setupListeners(store.dispatch)
