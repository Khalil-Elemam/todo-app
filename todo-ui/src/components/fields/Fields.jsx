/* eslint-disable react/prop-types */


import { RiUserReceivedLine, RiUserSharedLine} from "react-icons/ri"; 
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordLine} from 'react-icons/ri'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.css'


function Field({id, name, label, type, icon, placeholder, required = true, value, handleChange}) {


    return (
        <fieldset className={styles.fieldset}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <div className={styles.inputContainer}>
                {icon}
                <input 
                    autoComplete="off"
                    type={type} 
                    className={styles.field} 
                    id={id} 
                    placeholder={placeholder}
                    name={name}
                    required = {required}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </fieldset>
    )
}

export function EmailInput({name, value, handleChange}) {
    return (
        <Field 
            name={name}
            id='email'
            label='Email'
            type='email'
            placeholder='Email'
            icon={<MdEmail className={styles.icon} />}
            value={value}
            handleChange={handleChange}
        />
    )
}


export function PasswordInput({name, forgetPasswordLink = false, value, handleChange}) {

    const passwordInputRef = useRef()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <fieldset className={styles.fieldset}>
            <div className={styles.passwordLabel}>
                <label htmlFor="password" className={styles.label}>Password</label>
                {forgetPasswordLink && <Link className='link-text'>Forgot Password?</Link>}
            </div>
            <div className={styles.inputContainer}>
                <RiLockPasswordLine className={styles.icon}/>
                <input 
                    type={showPassword ? "text" : "password"} 
                    className={styles.field} 
                    id='password' 
                    placeholder='Password' 
                    ref={passwordInputRef}
                    name={name}
                    required
                    value={value}
                    onChange={handleChange}
                />
                <button 
                    type = 'button' 
                    className={styles.eyeBtn} 
                    onClick={() => setShowPassword(prevShowPassword => !prevShowPassword)}
                >
                    {showPassword ? <IoMdEyeOff /> : <IoEye />}
                </button>
            </div>
        </fieldset>
    )
}


export function FirstName({name, value, handleChange}) {
    return (
        <Field 
            name={name}
            id='firstname'
            label='First Name'
            type='text'
            placeholder='First Name'
            icon={<RiUserReceivedLine className={styles.icon} />}
            value={value}
            handleChange={handleChange}
        />
    )
}


export function LastName({name, value, handleChange}) {
    return (
        <Field 
            name={name}
            id='lastname'
            label='Last Name'
            type='text'
            placeholder='Last Name'
            icon={<RiUserSharedLine className={styles.icon} />}
            value={value}
            handleChange={handleChange}
        />
    )
}