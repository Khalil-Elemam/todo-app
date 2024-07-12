/* eslint-disable react/prop-types */

import { Header, Calendar, Progress, TodoList } from '../../components'
import styles from './index.module.css'

function Home() {

    return (
        <main className={styles.home}>
            <Header />
            <div className={`container ${styles.homeContainer}`}>
                <TodoList className={styles.todoList}/>
                <aside className={styles.sidebar}>
                    <Calendar />
                    <Progress total={10} completed={10}/>
                </aside>
            </div>
        </main>
    )
}

export default Home