/* eslint-disable react/prop-types */


import { ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/im"; 
import { RiTodoFill } from "react-icons/ri"; 
import { MdDelete } from "react-icons/md"; 
import { BsPencilSquare } from "react-icons/bs"; 
import styles from './index.module.css'


function Todo({content, done = false, targetDate, id, deleteTodo, toggleTodoStatus, setTodo, hideTodo}) {

    function handleUpdateTodo() {
        hideTodo(id)
        setTodo({id, content, done, targetDate: new Date(targetDate)})
    }

    return (
        <div className={styles.todo}>
            <div className={styles.todoDetails}>
                <div className={styles.todoInfo}>
                    <RiTodoFill className={styles.todoIcon}/>
                    <p className={`${styles.todoContent} ${done ? styles.completed : ''}`}>{content}</p>
                </div>
                <div className={styles.todoControllers}>
                    <button 
                        className={styles.todoController}
                        onClick={() => toggleTodoStatus({content, id, targetDate, done})}
                    >
                        {done ? 
                            <ImCheckboxChecked className={styles.todoIcon}/> : 
                            <ImCheckboxUnchecked className={styles.todoIcon}/>
                        }
                    </button>
                    <button 
                        className={styles.todoController}
                        onClick={handleUpdateTodo}
                    ><BsPencilSquare className={`${styles.todoIcon} ${styles.updateIcon}`}/></button>
                    <button 
                        className={styles.todoController}
                        onClick={() => deleteTodo(id)}
                    ><MdDelete className={`${styles.todoIcon} ${styles.deleteIcon}`}/></button>
                </div>
            </div>
            <div className={styles.todoTags}>
                <span className='tag'>{targetDate}</span>
                {done && <span className='tag'>Completed</span>}
            </div>
        </div>
    )
}

export default Todo