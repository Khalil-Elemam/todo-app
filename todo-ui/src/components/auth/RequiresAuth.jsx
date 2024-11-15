/* eslint-disable react/prop-types */


import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks"


function RequiresAuth({children}) {

    const {token} = useAuth()

    return (
        token ? children : <Navigate to='/login' />
    )
}

export default RequiresAuth