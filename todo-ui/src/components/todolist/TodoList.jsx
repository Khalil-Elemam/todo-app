/* eslint-disable react/prop-types */


import { Todo, TodoForm } from '../../components'
import { formatToDashes } from '../../utils/DateUtils'
import styles from './index.module.css'

function TodoList({className}) {
    const date = formatToDashes(new Date())

    return (
        <section className={className}>
            <TodoForm />
            <section className={styles.todos}>
                <Todo 
                    content={"This is the first todo and this is the most detailed todo about my todo app"}
                    targetDate={date}
                />
                <Todo 
                    content={"This is the second todo"}
                    targetDate={date}
                />
                <Todo 
                    content={"This is the third todo"}
                    targetDate={date}
                />
                <Todo 
                    content={"This is the fourth todo"}
                    targetDate={date}
                />
                <Todo 
                    content={"This is the fifth todo"}
                    targetDate={date}
                />
                <Todo 
                    content={"This is the sixth todo"}
                    targetDate={date}
                />
            </section>
        </section>
    )
}

export default TodoList