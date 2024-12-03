
import styles from './index.module.css'


function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loading