/* eslint-disable react/prop-types */

import { createContext, useState } from "react"
import { authenticate } from "../api/AuthenticationService"
import api from "../api/axios"


export const AuthContext = createContext(undefined)

function AuthProvider({children}) {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [token, setToken] = useState()

    async function login(authRequest) {
        try {
            const {accessToken} = (await authenticate(authRequest)).data
            const jwtToken = `Bearer ${accessToken}`
            setAuthenticated(true)
            setToken(jwtToken)

            api.interceptors.request.use(config => {
                config.headers.Authorization = jwtToken
                return config
            })
            
        } catch(error) {
            console.log(error)
        }
    }

    function logout() {
        setAuthenticated(false)
        setToken(undefined)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider