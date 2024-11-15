import { useEffect, useState } from "react"
import {useAxiosPrivate} from './'
import { formatToDashes } from "../utils/DateUtils"

function useTodos(date = null) {

    const [todos, setTodos] = useState([])
    const resourceUrl = '/users/me/todos'
    const api = useAxiosPrivate()

    const todosNum = todos.length
    const completedTodosNum = todos.filter(t => t.done).length

    useEffect(() => {
        const fetch = async (date = null) => {
            try {
                const {data} = await api.get(`${resourceUrl}${date ? `?date=${formatToDashes(date)}` : ''}`)
                setTodos(data)
            } catch(e) {
                console.log(e)
            }
        }
        fetch(date)
    }, [api, date])

    async function addTodo(todo){
        try {
            const {data} = await api.post(resourceUrl, todo)
            setTodos(prevTodos => sameDate(data.targetDate) ? [data, ...prevTodos] : [...prevTodos])
            return true
        }catch(e) {
            console.log(e)
        }
    }

    async function deleteTodo(id) {
        try {
            await api.delete(`${resourceUrl}/${id}`)
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
        }catch(e) {
            console.log(e)
        }
    }

    async function toggleTodoStatus(todo) {
        try {
            const {data} = await api.put(`${resourceUrl}/${todo.id}`, {...todo, done: !todo.done})
            setTodos(prevTodos => prevTodos.map(t => t.id ===  todo.id ? data : t))
        } catch(e) {
            console.log(e)
        }
    }

    async function updateTodo(oldTodo, updatedTodo) {
        try {
            const {data} = await api.put(`${resourceUrl}/${updatedTodo.id}`, updatedTodo)
            setTodos(prevTodos => sameDate(data.targetDate) ? [data, ...prevTodos] : [...prevTodos])
            return true
        } catch(e) {
            setTodos(prevTodos => [...prevTodos, oldTodo])
            console.log(e)
        }
    }

    function hideTodo(id) {
        setTodos(prevTodos => prevTodos.filter(t => t.id !== id))
    }

    function sameDate(targetDate) {
        return !date || (date && targetDate === formatToDashes(date))
    }

    return {
        todos,
        todosNum,
        completedTodosNum,
        addTodo, 
        deleteTodo,
        toggleTodoStatus,
        updateTodo,
        hideTodo
    }
}

export default useTodos