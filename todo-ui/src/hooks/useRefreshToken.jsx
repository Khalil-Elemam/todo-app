

import axios from "../api/AxiosConfig"
import { useAuth } from './'


function useRefreshToken() {
    const {setToken} = useAuth()

    async function refresh() {
        const {data} = await axios.post('/auth/refresh', {}, {withCredentials: true})
        setToken(data.accessToken)
        return data.accessToken
    }

    return refresh
}

export default useRefreshToken