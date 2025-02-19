import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks"
import s from "./TodolistTitle.module.css"
import { todolistsApi, useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from "../../../../api/todolistsApi"
import { RequestStatus } from "../../../../../../app/appSlice"
import { DomainTodolist } from "../../Types/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {

  const { title, id, entityStatus } = todolist

  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
  const [removeTodolist] = useRemoveTodolistMutation()

  const dispatch = useAppDispatch()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, state => {
        const index = state.findIndex(tl => tl.id === id)
        if (index !== -1) {
          state[index].entityStatus = status
        }
      })
    )
  }

  const removeTodolistHandler = () => {
    updateQueryData('loading')
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryData('idle')
      })
  }

  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
