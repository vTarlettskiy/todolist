import {FilterValuesType, TaskType} from "../AppWithRedux";
import {ChangeEvent, memo, useCallback, useMemo} from "react";
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
import {ButtonWithMemo} from "../components/button/ButtonWithMemo";
import {ButtonMemo} from "../components/button/ButtonMemo";
import {TaskWithRedux} from "../task/TaskWithRedux";

type PropsType = {
    todolist: TodolistType
}

export const Todolist1 = memo(({todolist}: PropsType) => {

    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    const dispatch = useDispatch()

    const changeFilterTasks = useCallback((filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }, [dispatch])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [dispatch])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [dispatch])

    const updateTodolist = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }, [dispatch])

    tasks = useMemo(() => {
        if (filter === 'active') {
            tasks = tasks.filter(t => !t.isDone)
        }

        if (filter === 'completed') {
            tasks = tasks.filter(t => t.isDone)
        }
        return tasks
    }, [tasks, filter])

    // const changeTaskStatus = useCallback((taskId: string, newStatusValue: boolean) => {
    //     dispatch(changeTaskStatusAC(taskId, newStatusValue, id))
    // }, [dispatch])
    //
    // const removeTask = useCallback((taskId: string) => {
    //     dispatch(removeTaskAC(taskId, id))
    // }, [dispatch])
    //
    // const updateTask = useCallback((taskId: string, newTitle: string) => {
    //     dispatch(changeTaskTitleAC(taskId, newTitle, id))
    // }, [dispatch])

    // const mappedTasks = tasks.map((task) => {
    //
    //     return <Task key={task.id}
    //                  task={task}
    //                  removeTask={removeTask}
    //                  changeTaskStatus={changeTaskStatus}
    //                  updateTask={updateTask}/>
    // })

    const mappedTasks = tasks.map((task) => {

        return <TaskWithRedux key={task.id}
                     task={task}
                     todolistId={id}/>
    })

    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3>
                    <EditableSpan oldTitle={title} updateItem={updateTodolist}/>

                    <IconButton aria-label="delete" onClick={removeTodolist}>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                </h3>
            </div>
            <AddItemForm addItem={addTask}/>

            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {mappedTasks}
                    </List>
            }

            <ButtonGroup sx={filterButtonsContainerSx}>
                <ButtonWithMemo variant={filter === 'all' ? 'outlined' : 'contained'}
                                onClick={() => changeFilterTasks('all')}
                                color={'inherit'}
                                title={'All'}/>
                <ButtonWithMemo variant={filter === 'active' ? 'outlined' : 'contained'}
                                onClick={() => changeFilterTasks('active')}
                                color={'primary'}
                                title={'Active'}/>
                <ButtonWithMemo variant={filter === 'completed' ? 'outlined' : 'contained'}
                                onClick={() => changeFilterTasks('completed')}
                                color={'secondary'}
                                title={'Completed'}/>
            </ButtonGroup>
        </div>
    )
})
