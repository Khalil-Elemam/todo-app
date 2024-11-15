

import axios from '../api/AxiosConfig'
import useAuth from "./useAuth"


function useLogout() {

    const {setToken} = useAuth()

    async function logout(){
        try {
            await axios.post('/auth/logout', {}, {withCredentials: true})
            setToken(null)
        } catch(e) {
            console.log(e)
        }
    }

    return logout
}

export default useLogout