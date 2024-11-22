import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "../../../app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId: string) => {
        return {
          url: `todo-lists/${todolistId}/tasks`,
        }
      },
      providesTags: ["Task"],
    }),
   createTask: build.mutation<BaseResponse<{item: DomainTask}>, { title: string; todolistId: string }>({
     query: ({ title, todolistId }) => {
       return {
         url: `todo-lists/${todolistId}/tasks`,
         method: "POST",
         body: { title },
       }
     },
     invalidatesTags: ['Task']
   }),
    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ['Task']
    }),
    updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => {
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: 'PUT',
          body: model
        }
      },
      invalidatesTags: ['Task']
    })
  })
})

export const {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = tasksApi

// export const _tasksApi = {
//   getTasks(todolistId: string) {
//     return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
//   },
//   createTask(payload: { title: string; todolistId: string }) {
//     const { title, todolistId } = payload
//     return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
//   },
//   deleteTask(payload: { todolistId: string; taskId: string }) {
//     const { taskId, todolistId } = payload
//     return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
//   },
//   updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
//     const { taskId, todolistId, model } = payload
//     return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
//   },
// }
