/* eslint-disable react/prop-types */


import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import useLogout from '../../hooks/useLogout'
import styles from './index.module.css'

function Header() {

    const logout = useLogout()
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate('/login')
    }

    return (
        <header className={styles.header} >
            <div className={`container ${styles.container}`}>
                <div className={styles.headerLogo}>
                    <img src={logo} alt="Superlist logo" className="logo-image" />
                    <h1 className="logo-text">Superlist</h1>
                </div>
                <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Header