/* eslint-disable react/prop-types */

import { createContext, useState } from "react"


export const AuthContext = createContext(undefined)

function AuthProvider({children}) {
    const [token, setToken] = useState(null)
    return (
        <AuthContext.Provider value={{token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider