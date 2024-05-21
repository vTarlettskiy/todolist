import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./todolist/Todolist";

function App() {

    const todolistTitle = 'What to learn'
    // const tasksList: Array<TaskPropsType> = [
    //     // {id: 1, title: 'HTML&CSS', isDone: true},
    //     // {id: 2, title: 'JS', isDone: true},
    //     // {id: 3, title: 'React', isDone: false},
    // ]

    const todolistTitle_1 = 'What to buy'
    // const tasksList_1: Array<TaskPropsType> = [
    //     {id: 1, title: 'Water', isDone: true},
    //     {id: 2, title: 'Beer', isDone: true},
    //     {id: 3, title: 'Meat', isDone: false},
    // ]



    const [tasksList, setTasksList] = useState<TaskPropsType[]>([
         {id: 1, title: 'Water', isDone: true},
         {id: 2, title: 'Beer', isDone: true},
         {id: 3, title: 'Meat', isDone: false},
     ])

    const removeTask = (id: number) => {
        let filteredTasks = tasksList.filter(t => t.id !== id)
        setTasksList(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask = {id: 4, title, isDone: false}
        setTasksList([newTask, ...tasksList ])
    }

    const changeTaskStatus = (taskId: number, checked: boolean) => {
        const newStatus = tasksList.map(task => {
           return  task.id === taskId ? {...task, isDone: checked} : task
        })
        setTasksList(newStatus)
    }




    return (
        <div className="App">
            {/*<Todolist title={todolistTitle} tasks={tasksList}/>*/}
            <Todolist title={todolistTitle_1} tasks={tasksList} removeTask={removeTask} addTask={addTask} changeTaskStatus={changeTaskStatus}/>
        </div>
    );
}

export default App;
