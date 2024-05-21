import React from 'react';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
}

export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {

    const tasksElements: Array<JSX.Element> | JSX.Element= tasks.length !== 0
        ? tasks.map(task => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>
        );
    })
    : <span>Tasks not found</span>

    return (
        <div className={'todolist'}>
            <h3>{title}</h3>
            <div>
            <input/>
                <button>+</button>
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

