/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { formatToDayMonth, formatToMonthYear } from '../../utils/DateUtils'
import styles from './index.module.css'
import { forwardRef, useState } from "react";


function Calendar({targetDate, className, setTargetDate, startDate=new Date(), defaultTargetDate = targetDate}, ref) {

    const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const [date, setDate] = useState(startDate)
    const numOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

    function createCalender() {
        const res = []
        let fakeDay = 0
        while(new Date(date.getFullYear(), date.getMonth(), 1).getDay() !== fakeDay++) 
            res.push(<p className={styles.day} key={fakeDay}></p>)
        
        const realDays = Array
                        .from({length: numOfDays})
                        .map((_, index) => (
                                <button 
                                    key={index} 
                                    type="button"
                                    className={`${styles.day} ${styles.realDay} 
                                        ${targetDate && targetDate.toDateString() === date.toDateString() && date.getDate() === index + 1 ? styles.selected : ''}`
                                    } 
                                    onClick={() => handleDateDay(index + 1)}
                                >{index + 1}</button>
                            )
                        )
        return [...res, realDays]
    }

    function handleDateDay(day) {
        const newDate = new Date(date)
        newDate.setDate(day)
        if(targetDate && targetDate.toDateString() === newDate.toDateString())
            setTargetDate(defaultTargetDate)
        else {
            setDate(newDate)
            setTargetDate(newDate)
        }
    }

    function increaseDateMonth() {
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            if (newDate.getMonth() !== (prevDate.getMonth() + 1) % 12) {
                newDate.setDate(0);
            }
            return newDate;
        });
    }

    function decreaseDateMonth() {
        setDate(prevDate => {
            const newDate = new Date(prevDate); 
            newDate.setMonth(newDate.getMonth() - 1);
            if (newDate.getMonth() !== (prevDate.getMonth() - 1 + 12) % 12) {
                newDate.setDate(0);
            }
            return newDate;
        });
    }


    return (
        <section className={`${styles.calenderContainer} ${className ? className : ''}`} ref={ref}>
            <p className={styles.selectedDate}>{formatToDayMonth(new Date())}</p>
            <div className={styles.calenderControllers}>
                <button
                    className={styles.controllerBtn}
                    onClick={decreaseDateMonth}
                    type="button"
                ><AiFillCaretLeft className={styles.calenderIcon} /></button>
                <p className={styles.controllersDate}>{formatToMonthYear(date)}</p>
                <button 
                    className={styles.controllerBtn}
                    onClick={increaseDateMonth}
                    type="button"
                ><AiFillCaretRight className={styles.calenderIcon}/></button>
            </div>
            <div className={styles.days}>
                {DAYS.map(day => <p key={day}>{day}</p>)}
            </div>
            <div className={styles.calender}>
                {createCalender()}
            </div>
        </section>
    )
}

export default forwardRef(Calendar)