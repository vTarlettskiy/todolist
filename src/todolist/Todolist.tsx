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

type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    filter: FilterValuesType

    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    updateTodolist: (todolistID: string, newTitle: string) => void
}

export const Todolist = ({
                             todolistId,
                             removeTodolist,
                             updateTask,
                             updateTodolist,
                             tasks,
                             filter,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             title
                         }: PropsType) => {

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }

    const mappedTasks = tasks.map((task) => {

        const removeTaskHandler = () => {
            removeTask(task.id, todolistId)
        }

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = e.currentTarget.checked
            changeTaskStatus(task.id, newStatusValue, todolistId)
        }

        const updateTaskHandler = (newTitle: string) => {
            updateTask(todolistId, task.id, newTitle)
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
