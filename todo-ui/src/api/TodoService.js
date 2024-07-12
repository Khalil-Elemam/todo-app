import api from "./axios";

const URL = "/users/me/todos"

export const getAllTodos = async() => api.get(`${URL}`)
export const getAllTodosByDate = async(date) => api.get(`${URL}?date=${date}`)
export const getTodoById = async(id) => api.get(`${URL}/${id}`)
export const addTodo = async(todo) => api.post(`${URL}`, todo)
export const updateTodo = async(updatedTodo) => api.put(`${URL}`, updatedTodo)
export const deleteTodo = async(id) => api.delete(`${URL}/${id}`)