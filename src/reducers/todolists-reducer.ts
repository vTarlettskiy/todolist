import {FilterValuesType, TasksStateType, TodolistType} from "../AppWithRedux";

export type AddTodolistAT = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
        id: string
    }
}

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string
    }
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id: string
        title: string
    }
}

type AT = AddTodolistAT | RemoveTodolistAT | ChangeTodolistFilterAT | ChangeTodolistTitleAT

const initialState: TodolistType[] = []

export const todolistsReducer = (todolists: TodolistType[] = initialState, action: AT): TodolistType[] => {

    switch (action.type) {
        case 'ADD-TODOLIST': {
            const {title, id} = action.payload
            return [{id, title, filter: 'all'}, ...todolists]
        }

        case "REMOVE-TODOLIST": {
            const {id} = action.payload
            return todolists.filter(tl => tl.id !== id)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const {filter, id} = action.payload
            return todolists.map(tl => {
                return tl.id === id ? {...tl, filter} : tl
            })
        }

        case "CHANGE-TODOLIST-TITLE": {
            const {title, id} = action.payload
            return todolists.map(el => el.id === id
                ? {...el, title}
                : el
            )
        }

        default :
            return todolists
    }
}

export const addTodolistAC = (id: string, title: string): AddTodolistAT => ({
    type: "ADD-TODOLIST",
    payload: {
        id,
        title
    }
})

export const removeTodolistAC = (id: string): RemoveTodolistAT => ({
    type: "REMOVE-TODOLIST",
    payload: {
        id
    }
})

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        id,
        filter
    }
})

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        id,
        title
    }
})