import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks"

import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { useCreateTaskMutation } from "../../../api/tasksApi"
import { DomainTodolist } from "../Types/types"

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  // const dispatch = useAppDispatch()

  const [createTask] = useCreateTaskMutation()

  const addTaskCallback = (title: string) => {
    // dispatch(addTaskTC({ title, todolistId: todolist.id }))
    createTask({title, todolistId: todolist.id})
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  )
}
