import List from "@mui/material/List"
import { Task } from "./Task/Task"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { TasksPagination } from "../TasksPagination/TasksPagination"
import { DomainTodolist } from "../../Types/types"
import { useTasks } from "./lib/hooks/useTasks"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {

  const { tasks, page, setPage, totalCount, isLoading } = useTasks(todolist)

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {tasks?.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          {
            totalCount !== undefined && totalCount > 4 && (
              <TasksPagination totalCount={totalCount} page={page} setPage={setPage} />
            )
          }
        </>
      )}
    </>
  )
}
