/* eslint-disable react/prop-types */


import { RiTodoFill } from "react-icons/ri"; 
import { DatePicker, ValidationErrorList } from '../../components'
import styles from './index.module.css'
import { useRef, useState } from "react";
import { date, object, string } from "yup";


function TodoForm({addTodo, updateTodo, todo, setTodo}) {

    const [validationErrors, setValidationErrors] = useState([])
    const oldTodoRef = useRef(todo)
    async function validate() {
        const schema = object({
            content: string()
                    .required("todo can't be empty")
                    .min(5, 'todo content should be 5 characters at least'),
            targetDate: date()
                        .required("please select a date")
                        .min(new Date(new Date().setHours(0, 0, 0, 0)), "date is in the past, please select a present date")
        })
        setValidationErrors([])
        try {
            await schema.validate(todo, {abortEarly: false})
            return true
        } catch(e) {
            e.inner.forEach(({message}) => 
                setValidationErrors(
                    prevValidationErrors => [...prevValidationErrors, message]
                )
            )
            return false
        }
    }

    function handleContentChange(e) {
        setTodo(prevTodo => ({...prevTodo, content: e.target.value}))
    }

    function handleDateChange(date){
        setTodo(prevTodo => ({...prevTodo, targetDate: date}))
    }

    async function handleSave(e) {
        e.preventDefault()
        let success = false
        if (await validate()){
            if (todo.id) 
                success = updateTodo(oldTodoRef.current, todo)
            else 
                success = addTodo(todo)
        }
        if (success)
            setTodo(t => ({id: undefined, content: '', done: false, targetDate: t.targetDate}))    
    }

    return (
        <form onSubmit={handleSave} className={styles.addTodoContainer}>
            <div className={styles.todoInputContainer}>
                <RiTodoFill className={styles.icon}/>
                <input 
                    type="text" 
                    className={styles.todoInput}
                    value={todo?.content}
                    name="content"
                    onChange={handleContentChange}
                />
            </div>
            <div className={styles.wrapper}>
                <DatePicker className={styles.dateInput} date={todo.targetDate} setDate={handleDateChange}/>
                <button className={styles.addBtn} onClick={handleSave}>Save</button>
            </div>
            {validationErrors.length !== 0 && <ValidationErrorList errors={validationErrors} className={styles.validationList}/>}
        </form>
    )
}

export default TodoForm