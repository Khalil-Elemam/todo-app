

import { RiTodoFill } from "react-icons/ri"; 
import { DatePicker } from '../../components'
import styles from './index.module.css'

function TodoForm() {

    return (
        <div className={styles.addTodoContainer}>
            <div className={styles.todoInputContainer}>
                <RiTodoFill className={styles.icon}/>
                <input type="text" className={styles.todoInput}/>
            </div>
            <div className={styles.wrapper}>
                <DatePicker className={styles.dateInput}/>
                <button className={styles.addBtn}>Add</button>
            </div>
        </div>
    )
}

export default TodoForm