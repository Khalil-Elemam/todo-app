// eslint-disable-next-line react-refresh/only-export-components


import logo from '../../assets/logo.png'
import { EmailInput, FirstName, LastName, PasswordInput } from '../../components/fields/Fields'
import { Link } from 'react-router-dom'
import { object, string } from 'yup'
import styles from './index.module.css'
import { useState } from 'react'
import { register } from '../../api/AuthenticationService'
import { ValidationErrorList } from '../../components'


function SignUp() {

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const [validationErrors, setValidationErrors] = useState({
        firstName: [],
        lastName: [],
        email: [],
        password: []
    })
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    async function validate() {
        const schema = object({
            firstName: string()
                .required("First Name is required")
                .min(3, 'firstName should be at least 3 characters')
                .max(35, 'firstName should be less than 35 characters'),
            lastName: string()
                .required('Last Name is required')
                .min(3, 'lastName should be at least 3 characters')
                .max(35, 'lastName should be less than 35 characters'),
            email: string()
                .required("Email is required")
                .email("should be a valid email"),
            password: string()
                .min(8, 'password should be at least 8 characters')
                .required('password is required')
                .matches(/[0-9]/, 'should contain at least one number')
                .matches(/[A-Z]/, 'should contain at least one capital letter')
                .matches(/[!@#$%^*|=+_-]/, 'should contain at least on symbol (! @ # $ % ^ & * _ - + = |)')
        })
        setValidationErrors({
            firstName: [],
            lastName: [],
            email: [],
            password: []
        })

        try {
            await schema.validate(data, {abortEarly: false})
            return true
        } catch(error) {
            error.inner.forEach(({path, message}) => {
                setValidationErrors(prevValidationErrors => ({
                    ...prevValidationErrors,
                    [path]: [...prevValidationErrors[path], message]
                }))
            })
            return false
        }
    }


    function handleChange(e) {
        const {name, value} = e.target
        setData(prevData => ({...prevData, [name]: value}))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (await validate()) {
            try {
                const {message} = (await register(data)).data
                setSuccess(message)
                setError(null)
            } catch(error) {
                const message = error.response.data.message || 'registration failed'
                setSuccess(null)
                setError(message)
            }
        }
    }

    return (
        <div className={`${styles.signUp} gradient-net`}>
            <div className="container">
                <div className={styles.logo}>
                    <img src={logo} alt="Superlist logo" className={styles.logoImage} />
                    <h1 className={styles.signUpHeader}>Superlist</h1>
                </div>
                <p className={styles.welcomeText}>Join SuperList. Simplify your tasks today!</p>
                <div className="glass-effect form-container">
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
                    <form className={styles.signUpForm} onSubmit={handleSubmit}>
                        <FirstName name = 'firstName' value={data.firstName} handleChange={handleChange}/>
                        {validationErrors.firstName.length !== 0 && <ValidationErrorList errors={validationErrors.firstName}/>}
                        <LastName name = 'lastName' value={data.lastName} handleChange={handleChange}/>
                        {validationErrors.lastName.length !== 0 && <ValidationErrorList errors={validationErrors.lastName}/>}
                        <EmailInput name = 'email' value={data.email} handleChange={handleChange}/>
                        {validationErrors.email.length !== 0 && <ValidationErrorList errors={validationErrors.email}/>}
                        <PasswordInput name = 'password' value={data.password} handleChange={handleChange}/>
                        {validationErrors.password.length !== 0 && <ValidationErrorList errors={validationErrors.password}/>}
                        <button className='form-btn'>Sign Up</button>
                    </form>
                    <p className='link-text'>
                        Already have an account? <Link to='/login'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp