import * as React from 'react';
import {EditableSpan} from "../components/editableSpan/EditableSpan";
import {TaskType} from "../App";
import {ChangeEvent} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CheckBox from "@mui/material/Checkbox";
import ListItem from '@mui/material/ListItem';

type TaskPropsType = {
    task: TaskType
    removeTaskHandler: () => void
    changeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
    updateTaskHandler: (newTitle: string) => void
}

export const Task = ({task, updateTaskHandler, removeTaskHandler, changeTaskStatusHandler}: TaskPropsType) => {


    return (
        <ListItem key={task.id} sx={{p: 0, justifyContent: 'space-between', opacity: task.isDone ? 0.5 : 1}}>
            <div>
                <CheckBox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan oldTitle={task.title} updateItem={updateTaskHandler}/>
            </div>
            <IconButton aria-label="delete" onClick={removeTaskHandler}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
};