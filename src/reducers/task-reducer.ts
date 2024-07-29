import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

export type AddTaskAT = ReturnType<typeof addTaskAC>

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>

export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type AT = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: AT): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }

        case 'ADD-TASK': {
            const task: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state, [action.todolistId]: [task, ...state[action.todolistId]]
            }
        }

        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        }

        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        }

        case "ADD-TODOLIST": {
            return {
                ...state, [action.payload.id]: []
            }
        }

        case "REMOVE-TODOLIST": {
            // let copyState = {...state}
            // delete copyState[action.payload.id]
            // return copyState
            const {[action.payload.id]: [], ...rest} = state
            return rest
        }

        default :
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
}