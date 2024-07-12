/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { formatToDayMonth, formatToMonthYear } from '../../utils/DateUtils'
import styles from './index.module.css'
import { forwardRef } from "react";


function Calendar({date = new Date(), className, setDate}, ref) {

    const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const numOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

    //console.log(date, targetDate)

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
                                    className={`${styles.day} ${styles.realDay} 
                                        ${date.getUTCDate() === index + 1 ? styles.selected : ''}`
                                    }
                                    onClick={() => handleDateDay(index + 1)}
                                >{index + 1}</button>
                            )
                        )
        return [...res, realDays]
    }

    function handleDateDay(day) {
        console.log(day)
        setDate(prevDate => new Date(prevDate.setUTCDate(day)))
    }

    function increaseDateMonth() {
    setDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setMonth(newDate.getMonth() + 1);
        console.log(prevDate.getMonth(), newDate.getMonth())
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
                ><AiFillCaretLeft className={styles.calenderIcon} /></button>
                <p className={styles.controllersDate}>{formatToMonthYear(date)}</p>
                <button 
                    className={styles.controllerBtn}
                    onClick={increaseDateMonth}
                ><AiFillCaretRight className={styles.calenderIcon}/></button>
            </div>
            <div className={styles.days}>
                {DAYS.map(day => <p key={day}>{day}</p>)}
            </div>
            <div className={styles.calender}>
                {/* {
                    Array.from({length: 49}).map((day, index) => {
                        const startingDate = new Date(date.getFullYear(), date.getMonth(), 1)
                        const dayNum = startingDate.getDay()
                        console.log((index % 6) + 1, dayNum)
                        return (dayNum === (index % 6) + 1) ?
                            <p key={day} className={styles.day}>{startingDate.getDate()}</p> : 
                            <p key={day} className={styles.day}></p>
                    })
                } */}
                {createCalender()}
            </div>
        </section>
    )
}

export default forwardRef(Calendar)