import React, {ChangeEvent, useState} from 'react';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: number) => void
    addTask: (titleValue: string) => void
    changeTaskStatus: (taskId: number, checked: boolean) => void
}

export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, removeTask, addTask, changeTaskStatus}: TodolistPropsType) => {
    const [titleValue, setTitleValue] = useState('')




    

    const removeTaskHandler = (j: number) => removeTask(j)

    const addTaskHandler = () => addTask(titleValue)
    
    const changeTaskStatusHandler = (e:  ChangeEvent<HTMLInputElement>, taskId: number) => {
        changeTaskStatus(taskId, e.currentTarget.checked)


    }


    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length !== 0
        ? tasks.map(task => {


        return (
            <li>
                <input type="checkbox" checked={task.isDone} onChange={(e) => changeTaskStatusHandler(e, task.id)}/>
                <span>{task.title}</span>
                <button onClick={() => removeTaskHandler(task.id)}>x</button>
            </li>
        );
    })
    : <span>Tasks not found</span>

    return (
        <div className={'todolist'}>
            <h3>{title}</h3>
            <div>
            <input value={titleValue} onChange={(e) => setTitleValue(e.currentTarget.value)}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

