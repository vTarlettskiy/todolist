import axios from "axios"

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "API-KEY": '6515abbc-15d3-4701-b9d4-8532d9fb9757',
  },
})

instance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("sn-token")}`

  return config
})
