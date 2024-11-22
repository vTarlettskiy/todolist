import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Unstable_Grid2"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Todolist } from "./Todolist/Todolist"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { Skeleton } from "@mui/material"
import { TodolistSkeleton } from "../skeletons/TodolistSkeleton/TodolistSkeleton"

export const Todolists = () => {

  const { data: todolists, isLoading } = useGetTodolistsQuery(undefined, {
    pollingInterval: 3000,
    skipPollingIfUnfocused: true,
  })


  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '32px' }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

  return (
    <>
      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
