import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/'
})

export const getPonto = (user) => api.post('users/login', user)

const apis = {
    getPonto
}

export default apis
