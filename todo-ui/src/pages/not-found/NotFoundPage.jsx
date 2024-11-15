
import { Link } from 'react-router-dom'
import styles from './index.module.css'

function NotFoundPage() {

    return (
        <section>
            <div className={`container ${styles.missing}`}>
                <h2 className={styles.title}>OOPS!</h2>
                <p>Error 404: Page Not Found</p>
                <Link to='/' className='form-btn'>Home Page</Link>
            </div>
        </section>
    )
}

export default NotFoundPage