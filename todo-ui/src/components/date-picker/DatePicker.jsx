/* eslint-disable react/prop-types */


import { BsFillCalendarPlusFill } from "react-icons/bs"; 
import styles from './index.module.css'
import { formatToDashes } from "../../utils/DateUtils";
import { Calendar } from '../../components'
import { useEffect, useRef, useState } from "react";


function DatePicker({className}) {

    const [showCalendar, setShowCalendar] = useState(false) 
    const [date, setDate] = useState(new Date())
    const inputRef = useRef()
    const calendarRef = useRef()
    

    function handleClickOutside(event) {
        if(
            !inputRef.current?.contains(event.target) 
            && !calendarRef.current?.contains(event.target)
        )
            setShowCalendar(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return document.addEventListener('mousedown', handleClickOutside)
    }, [])


    return (
        <div className={`${styles.datePicker} ${className}`} ref={inputRef}>
            <input 
                type="text" 
                className={styles.dateInput}
                readOnly
                value={formatToDashes(date)}
            />
            <button 
                className={styles.calendarBtn}
                onClick={() => setShowCalendar(prevShowCalendar => !prevShowCalendar)}
            >
                <BsFillCalendarPlusFill className={styles.icon}/>
            </button>
            { showCalendar && <Calendar date={date} className={styles.calendar} setDate={setDate} ref={calendarRef}/> }
        </div>
    )
}

export default DatePicker