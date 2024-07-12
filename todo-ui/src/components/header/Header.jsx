import { HiMenu } from "react-icons/hi"; 
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useState } from "react";
import styles from './index.module.css'

function Header() {

    const [showMenu, setShowMenu] = useState(false)

    return (
        <header className={styles.header} >
            <div className={`container ${styles.container}`}>
                <div className={styles.headerLogo}>
                <img src={logo} alt="Superlist logo" className="logo-image" />
                <h1 className="logo-text">Superlist</h1>
                </div>
                <nav className={`${styles.navbar} ${showMenu ? styles.displayed : ''}`}>
                    <ul className={styles.navLinks}>
                        <li>
                            <NavLink 
                                to='/todos' 
                                className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                            >Todos</NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to='/settings' 
                                className={({isActive}) => `${styles.navLink} ${isActive ? '' : ''}`}
                            >Settings</NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to='/logout' 
                                className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                            >Logout</NavLink>
                        </li>
                    </ul>
                </nav>
                <button className={styles.menuBtn} onClick={() => setShowMenu(prevShowMenu => !prevShowMenu)}>
                    <HiMenu />
                </button>
            </div>
        </header>
    )
}

export default Header