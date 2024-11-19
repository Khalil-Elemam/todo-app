

import { useEffect, useState } from "react"
import {useAuth, useRefreshToken} from "../../hooks"
import { Outlet } from "react-router-dom"
import Loading from "../loading/Loading"

function PersistLogin() {

    const [loading, setLoading] = useState(true)

    const refresh = useRefreshToken()
    const {token} = useAuth()
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch(e) {
                console.log(e)
            } finally {
                setLoading(false)
            }
        }

        !token ? verifyRefreshToken() : setLoading(false)
    }, [refresh, token])

    return (
        loading ? <Loading /> : <Outlet />
    )
}

export default PersistLogin