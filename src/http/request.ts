// 封装 axios 请求
import axios from "axios";

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASEURL,
    timeout: 15000,
})

// axios 实例的拦截请求
service.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

// axios 实例的拦截响应
service.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})

export default service;