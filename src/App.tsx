import React from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./todolist/Todolist";

function App() {

    const todolistTitle = 'What to learn'
    const tasksList: Array<TaskPropsType> = [
        // {id: 1, title: 'HTML&CSS', isDone: true},
        // {id: 2, title: 'JS', isDone: true},
        // {id: 3, title: 'React', isDone: false},
    ]

    const todolistTitle_1 = 'What to buy'
    const tasksList_1: Array<TaskPropsType> = [
        {id: 1, title: 'Water', isDone: true},
        {id: 2, title: 'Beer', isDone: true},
        {id: 3, title: 'Meat', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title={todolistTitle} tasks={tasksList}/>
            <Todolist title={todolistTitle_1} tasks={tasksList_1}/>
        </div>
    );
}

export default App;
