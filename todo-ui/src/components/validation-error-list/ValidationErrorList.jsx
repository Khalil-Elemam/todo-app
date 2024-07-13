/* eslint-disable react/prop-types */

import styles from './index.module.css'

function ValidationErrorList({errors}) {

    return (
        <ul className={styles.validationList}>
            {errors.map((e, i) => {
                return <li key={i} className={styles.validationItem}>{e}</li>
            })}
        </ul>
    )
}

export default ValidationErrorList