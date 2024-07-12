/* eslint-disable react/prop-types */
import styles from './index.module.css'

function Progress({total, completed}) {

    const remaining = total - completed
    const progress = Math.round((completed / total) * 100)

    return (
        <div className={styles.progressBox}>
            <div className={styles.progressCircle}>
                <div className={styles.progress}>
                    <div className={`${styles.circle}`} style={{'--prog': `${progress}%`}}></div>
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
                    <span className="tag">{progress}%</span> completed
                </li>
                <li className={styles.infoItem}>
                    <span className="tag">{remaining}</span> tasks remaining
                </li>
            </ul>
            {total === completed && <p className={styles.doneText}>Congratulations! All tasks completed!</p>}
        </div>
    )
}

export default Progress