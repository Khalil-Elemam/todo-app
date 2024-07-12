import api from "./axios"

const URL = '/auth'

export const authenticate = async(authRequest) => api.post(`${URL}/login`, authRequest)

export const register = async(registerRequest) => api.post(`${URL}/register`, registerRequest)

export const activateAccount = async(token) => api.get(`${URL}/activate-account?token=${token}`)
