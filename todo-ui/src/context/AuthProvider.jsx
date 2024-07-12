/* eslint-disable react/prop-types */

import { createContext } from "react"


const AuthContext = createContext(undefined)

function AuthProvider({children}) {


    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider