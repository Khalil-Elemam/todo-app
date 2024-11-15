import { RxCrossCircled } from "react-icons/rx"; 
import { GrStatusGood } from "react-icons/gr"; 

import styles from './index.module.css'
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '../../api/AxiosConfig'


function AccountActivationPage() {

    const [accountStatus, setAccountStatus] = useState({
        activated: false,
        wasActivated: false
    })
    const [searchParams, ] = useSearchParams()
    const token = searchParams.get("token")
    

    useEffect(() => {
        async function activate(){
            try {
                const {data} = await axios.get(`/auth/activate-account?token=${token}`)
                setAccountStatus(data)
            } catch(error) {
                console.log(error)
            }
        }
        activate()
    }, [token])

    return (
        <section className={`${styles.accountActivation} container`}>
            <section className={styles.glassWrapper}>
                <h1 className={styles.title}>Account Activation</h1>
                {
                    accountStatus.activated ? 
                    <GrStatusGood className={`${styles.activationIcon} ${styles.true}`}/> :
                    <RxCrossCircled className={`${styles.activationIcon} ${styles.false}`}/>
                }
                <div className={styles.content}>
                    {
                        (accountStatus.activated && !accountStatus.wasActivated) && 
                        <>
                            <p className={styles.message}>Account activated Successfully, please login</p>
                            <Link to='/login' className={styles.btn}>Login</Link>
                        </>
                    }
                    {
                        (accountStatus.activated && accountStatus.wasActivated) && 
                        <>
                            <p className={styles.message}>Account already activated, go to home page</p>
                            <Link to='/' className={styles.btn}>Home</Link>
                        </>
                    }
                </div>
            </section>
        </section>
    )
}

export default AccountActivationPage