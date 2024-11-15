/* eslint-disable react/prop-types */

import { useState } from 'react'
import { Header, Calendar, Progress, TodoList } from '../../components'
import styles from './index.module.css'
import { useTodos } from '../../hooks'

function Home() {

    const [targetDate, setTargetDate] = useState(null)
    const {
            todos, 
            todosNum, 
            completedTodosNum, 
            addTodo, 
            deleteTodo, 
            toggleTodoStatus, 
            updateTodo,
            hideTodo
        } = useTodos(targetDate)

    return (
        <main className={styles.home}>
            <Header />
            <div className={`container ${styles.homeContainer}`}>
                <TodoList 
                    className={styles.todoList} 
                    todos = {todos} 
                    addTodo={addTodo} 
                    toggleTodoStatus={toggleTodoStatus} 
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                    hideTodo={hideTodo}
                />
                <aside className={styles.sidebar}>
                    <Calendar targetDate={targetDate} setTargetDate={setTargetDate} defaultTargetDate={null}/>
                    <Progress total={todosNum} completed={completedTodosNum}/>
                </aside>
            </div>
        </main>
    )
}

export default Home