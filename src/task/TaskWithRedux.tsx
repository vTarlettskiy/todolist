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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../reducers/store";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux = memo(({todolistId, task}: TaskPropsType) => {

    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(task.id, todolistId))
    }, [])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, newStatusValue, todolistId))
    }, [])

    const updateTask = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, todolistId))
    }, [])

    // const removeTaskHandler = () => {
    //     removeTask(task.id)
    // }
    //
    // const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     const newStatusValue = e.currentTarget.checked
    //     changeTaskStatus(task.id, newStatusValue)
    // }
    //
    // const updateTaskHandler = (newTitle: string) => {
    //     updateTask(task.id, newTitle)
    // }

    return (
        <ListItem
            sx={getListItemSx(task.isDone)}>
            <div>
                <CheckBox
                    checked={task.isDone}
                    onChange={changeTaskStatus}/>
                <EditableSpan
                    oldTitle={task.title}
                    updateItem={updateTask}/>
            </div>

            <IconButton
                aria-label="delete"
                onClick={removeTask}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
})