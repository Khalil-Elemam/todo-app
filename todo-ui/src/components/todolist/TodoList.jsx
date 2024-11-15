/* eslint-disable react/prop-types */

import { useState } from 'react'
import { Todo, TodoForm } from '../../components'
import { formatToDashes } from '../../utils/DateUtils'
import styles from './index.module.css'

function TodoList({className, todos, deleteTodo, toggleTodoStatus, addTodo, updateTodo, hideTodo}) {

    const [todo, setTodo] = useState({
        id: undefined,
        content: '',
        done: false,
        targetDate: new Date()
    })

    const todoElements = todos.map(todo => (
        <Todo 
            key={todo.id}
            id={todo.id}
            content={todo.content}
            targetDate={formatToDashes(new Date(todo.targetDate))}
            done={todo.done}
            deleteTodo={deleteTodo}
            toggleTodoStatus={toggleTodoStatus}
            setTodo={setTodo}
            hideTodo={hideTodo}
        />
    ))

    return (
        <section className={className}>
            <TodoForm addTodo={addTodo} updateTodo= {updateTodo} todo={todo} setTodo={setTodo}/>
            <section className={styles.todos}>
                {todoElements}
            </section>
        </section>
    )
}

export default TodoList