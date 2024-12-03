/* eslint-disable react/prop-types */


import { BsFillCalendarPlusFill } from "react-icons/bs"; 
import styles from './index.module.css'
import { formatToDashes } from "../../utils/DateUtils";
import { Calendar } from '../../components'
import { useEffect, useRef, useState } from "react";


function DatePicker({className, date, setDate}) {

    const [showCalendar, setShowCalendar] = useState(false) 
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
        return () => document.removeEventListener('mousedown', handleClickOutside)
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
                type="button"
            >
                <BsFillCalendarPlusFill className={styles.icon}/>
            </button>
            { showCalendar 
                && 
                <Calendar 
                    startDate={date} 
                    targetDate={date} 
                    className={styles.calendar} 
                    setTargetDate={setDate} 
                    ref={calendarRef}
                /> 
            }
        </div>
    )
}

export default DatePicker