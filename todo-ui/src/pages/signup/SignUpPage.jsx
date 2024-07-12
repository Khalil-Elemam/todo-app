// eslint-disable-next-line react-refresh/only-export-components


import logo from '../../assets/logo.png'
import { EmailInput, FirstName, LastName, PasswordInput } from '../../components/fields/Fields'
import { Form, Link } from 'react-router-dom'
import styles from './index.module.css'


function SignUp() {

    return (
        <div className={`${styles.signUp} gradient-net`}>
            <div className="container">
                <div className={styles.logo}>
                    <img src={logo} alt="Superlist logo" className={styles.logoImage} />
                    <h1 className={styles.signUpHeader}>Superlist</h1>
                </div>
                <p className={styles.welcomeText}>Join SuperList. Simplify your tasks today!</p>
                <div className="glass-effect form-container">
                    <Form method = "post" className={styles.signUpForm} name='registeration'>
                        <FirstName name = 'firstName' />
                        <LastName name = 'lastName'/>
                        <EmailInput name = 'email' />
                        <PasswordInput name = 'password'/>
                        <button className='form-btn'>Sign Up</button>
                    </Form>
                    <p className='link-text'>
                        Already have an account? <Link to='/login'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp