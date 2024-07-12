

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput } from '../../components/fields/Fields';
import styles from './index.module.css'
import { useState } from 'react';
import { authenticate } from '../../api/AuthenticationService';

function LoginPage() {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const {name, value} = e.target
        setData(prevData => ({...prevData, [name]: value}))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(data)
        try {
            const request = await authenticate(data)
            console.log(request)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div className={`${styles.login} gradient-net`}>
            <div className="container">
                <img src={logo} alt="Superlist logo" className={styles.logo} />
                <h1 className={styles.loginHeader}>Login to Superlist</h1>
                <div className="glass-effect form-container">
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        <EmailInput value={data.email} name='email' handleChange={handleChange}/>
                        <PasswordInput forgetPasswordLink value={data.password} name='password' handleChange={handleChange}/>
                        <button className='form-btn'>Log In</button>
                    </form>
                    <p className={'link-text'}>
                        Do not hava an account? <Link to='/register'>Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage