import * as React from 'react';
import {EditableSpan} from "../components/editableSpan/EditableSpan";
import {TaskType} from "../AppWithRedux";
import {ChangeEvent, memo, useCallback} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckBox from "@mui/material/Checkbox";
import ListItem from '@mui/material/ListItem';
import {getListItemSx} from "./Task.styles";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../reducers/task-reducer";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    updateTask: (taskId: string, newTitle: string) => void
    changeTaskStatus: (taskId: string, newStatusValue: boolean) => void
}

export const TaskWithRedux = memo(({task, updateTask, removeTask, changeTaskStatus}: TaskPropsType) => {


    // const removeTaskHandler = useCallback(() => {
    //     dispatch(removeTaskAC(task.id, id))
    // }, [])
    //
    // const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //     const newStatusValue = e.currentTarget.checked
    //     dispatch(changeTaskStatusAC(task.id, newStatusValue, id))
    // }, [])
    //
    // const updateTaskHandler = useCallback((newTitle: string) => {
    //     dispatch(changeTaskTitleAC(task.id, newTitle, id))
    // }, [])

    const removeTaskHandler = () => {
        removeTask(task.id)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(task.id, newStatusValue)
    }

    const updateTaskHandler = (newTitle: string) => {
        updateTask(task.id, newTitle)
    }

    return (
        <ListItem
            sx={getListItemSx(task.isDone)}>
            <div>
                <CheckBox
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}/>
                <EditableSpan
                    oldTitle={task.title}
                    updateItem={updateTaskHandler}/>
            </div>

            <IconButton
                aria-label="delete"
                onClick={removeTaskHandler}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
})