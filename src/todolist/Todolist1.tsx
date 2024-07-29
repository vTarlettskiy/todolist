import {FilterValuesType, TaskType} from "../App";
import {ChangeEvent} from "react";
import {AddItemForm} from "../components/addItemForm/AddItemForm";
import {EditableSpan} from "../components/editableSpan/EditableSpan";
import {Task} from "../task/Task";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ButtonGroup from "@mui/material/ButtonGroup";
import {filterButtonsContainerSx} from "./Todolist.styles";
import {TodolistType} from "../AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../reducers/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../reducers/task-reducer";

type PropsType = {
    todolist: TodolistType
}

export const Todolist1 = ({todolist}: PropsType) => {

    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    const dispatch = useDispatch()

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }

    const mappedTasks = tasks.map((task) => {

        const removeTaskHandler = () => {
            dispatch(removeTaskAC(task.id, id))
        }

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = e.currentTarget.checked
            dispatch(changeTaskStatusAC(task.id, newStatusValue, id))
        }

        const updateTaskHandler = (newTitle: string) => {
            dispatch(changeTaskTitleAC(task.id, newTitle, id))
        }

        if (filter === 'active') {
            tasks = tasks.filter(tasks => !tasks.isDone)
        }

        if (filter === 'completed') {
            tasks = tasks.filter(task => task.isDone)
        }

        return <Task task={task} removeTaskHandler={removeTaskHandler} changeTaskStatusHandler={changeTaskStatusHandler}
                     updateTaskHandler={updateTaskHandler}/>
    })

    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3>
                    <EditableSpan oldTitle={title} updateItem={updateTodolistHandler}/>

                    <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                </h3>
            </div>
            <AddItemForm addItem={addTaskHandler}/>

            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {mappedTasks}
                    </List>
            }

            <ButtonGroup sx={filterButtonsContainerSx}>
                <Button variant={filter === 'all' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterTasksHandler('all')}>All</Button>
                <Button variant={filter === 'active' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterTasksHandler('active')}>Active</Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'contained'}
                        onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
            </ButtonGroup>
        </div>
    )
}
