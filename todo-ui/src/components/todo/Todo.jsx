/* eslint-disable react/prop-types */


import { ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/im"; 
import { RiTodoFill } from "react-icons/ri"; 
import { MdDelete } from "react-icons/md"; 
import { BsPencilSquare } from "react-icons/bs"; 
import styles from './index.module.css'


function Todo({content, isDone = false, targetDate}) {
    return (
        <div className={styles.todo}>
            <div className={styles.todoDetails}>
                <div className={styles.todoInfo}>
                    <RiTodoFill className={styles.todoIcon}/>
                    <p className={`${styles.todoContent} ${isDone ? styles.completed : ''}`}>{content}</p>
                </div>
                <div className={styles.todoControllers}>
                    <button className={styles.todoController}>
                        {isDone ? 
                            <ImCheckboxChecked className={styles.todoIcon}/> : 
                            <ImCheckboxUnchecked className={styles.todoIcon}/>
                        }
                    </button>
                    <button 
                        className={styles.todoController}
                    ><BsPencilSquare className={`${styles.todoIcon} ${styles.updateIcon}`}/></button>
                    <button 
                        className={styles.todoController}
                    ><MdDelete className={`${styles.todoIcon} ${styles.deleteIcon}`}/></button>
                </div>
            </div>
            <div className={styles.todoTags}>
                <span className='tag'>{targetDate}</span>
                {isDone && <span className='tag'>Completed</span>}
            </div>
        </div>
    )
}

export default Todo