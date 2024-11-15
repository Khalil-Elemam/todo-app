/* eslint-disable react/prop-types */


import { useEffect, useState } from 'react'
import styles from './index.module.css'

function Progress({total, completed}) {

    const remaining = total - completed
    const [animatedProgress, setAnimatedProgress] = useState(0)

    useEffect(() => {
        let degree = animatedProgress
        const targetDegree = total ? Math.round((completed / total) * 100) : 0
        let interval = setInterval(() => {
            degree += degree < targetDegree ? 1 : -1
            setAnimatedProgress(degree)
            if (degree === targetDegree) {
                clearInterval(interval)
                return
            }
        }, 30)
        return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total, completed])

    return (
        <div className={styles.progressBox}>
            <div className={styles.progressCircle}>
                <div className={styles.progress} style={{'--prog': `${animatedProgress}%`}}>
                    <div className={styles.progressInfo}>
                        {completed}
                    </div>
                </div>
            </div> 
            <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                    <span className="tag">{completed}</span> tasks
                    of <span className="tag">{total}</span> tasks completed
                </li>
                <li className={styles.infoItem}>
                    <span className="tag">{animatedProgress}%</span> completed
                </li>
                <li className={styles.infoItem}>
                    <span className="tag">{remaining}</span> tasks remaining
                </li>
            </ul>
            {total !== 0 && total === completed && <p className={styles.doneText}>Congratulations! All tasks completed!</p>}
            {total === 0 && <p className={styles.doneText}>You have No Tasks</p>}
        </div>
    )
}

export default Progress