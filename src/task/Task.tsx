import * as React from 'react';
import {EditableSpan} from "../components/editableSpan/EditableSpan";
import {Button} from "../components/button/Button";
import {TaskType} from "../App";
import {ChangeEvent} from "react";

type TaskPropsType = {
    task: TaskType
    removeTaskHandler: () => void
    changeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
    updateTaskHandler: (newTitle: string) => void
}

export const Task = ({task, updateTaskHandler, removeTaskHandler, changeTaskStatusHandler}: TaskPropsType) => {


    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
            <EditableSpan oldTitle={task.title} updateItem={updateTaskHandler}/>
            <Button onClick={removeTaskHandler} title={'x'}/>
        </li>
    );
};