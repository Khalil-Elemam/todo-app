

import { useEffect } from "react"
import useAuth from "./useAuth"
import { axiosPrivate } from "../api/AxiosConfig"
import useRefreshToken from "./useRefreshToken"

function useAxiosPrivate() {

    const {token} = useAuth()
    const refresh = useRefreshToken()

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'])
                    config.headers['Authorization'] = `Bearer ${token}`
                return config
            },
            error => Promise.reject(error)
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async error => {
                const prevRequest = error?.config
                if(error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )
        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }
    }, [token, refresh])

    return axiosPrivate
}

export default useAxiosPrivate