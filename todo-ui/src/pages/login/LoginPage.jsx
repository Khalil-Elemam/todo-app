

import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { EmailInput, PasswordInput } from '../../components/fields/Fields';
import styles from './index.module.css'
import { useState } from 'react';
import { useAuth } from '../../hooks';
import axios from '../../api/AxiosConfig';

function LoginPage() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const {setToken} = useAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    function handleChange(e) {
        const {name, value} = e.target
        setCredentials(prevCredentials => ({...prevCredentials, [name]: value}))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const {data} = await axios.post(
                '/auth/login', 
                credentials, 
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
            setToken(data?.accessToken)
            navigate('/', {replace: true})
        } catch(error) {
            setError(error.response.data.message)
            console.log(error)
        }
    }

    return (
        <div className={`${styles.login} gradient-net`}>
            <div className="container">
                <img src={logo} alt="Superlist logo" className={styles.logo} />
                <h1 className={styles.loginHeader}>Login to Superlist</h1>
                <div className="glass-effect form-container">
                    {error && <p className='form-error'>{error}</p>}
                    <form className={styles.loginForm} onSubmit={handleSubmit}>
                        <EmailInput value={credentials.email} name='email' handleChange={handleChange}/>
                        <PasswordInput value={credentials.password} name='password' handleChange={handleChange}/>
                        <button className='form-btn'>Log In</button>
                    </form>
                    <p className='link-text'>
                        Do not hava an account? <Link to='/register'>Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage