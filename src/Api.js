import axios from 'axios'

const api = axios.create({
    baseURL: 'http://10.2.24.144:8080'
})

const getPonto = (ponto) => api.post('points', ponto)

const apis = {
    getPonto
}

export default apis
