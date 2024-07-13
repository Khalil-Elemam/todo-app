import { useEffect, useState } from "react"
import { getAllTodos } from "../api/TodoService"

function useTodos() {

    const [todos, setTodos] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const {data} = await getAllTodos()
                console.log(data)
            } catch(error) {
                console.log(error)
            }
        }
    }, [])

    function addTodo(){}

    return {
        todos
    }
}

export default useTodos