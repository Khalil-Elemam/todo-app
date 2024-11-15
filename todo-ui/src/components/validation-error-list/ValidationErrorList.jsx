/* eslint-disable react/prop-types */

import styles from './index.module.css'

function ValidationErrorList({errors, className=styles.default}) {

    return (
        <ul className={`${styles.validationList} ${className}`}>
            {errors.map((e, i) => {
                return <li key={i} className={styles.validationItem}>{e}</li>
            })}
        </ul>
    )
}

export default ValidationErrorList