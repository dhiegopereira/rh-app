import axios from 'axios'

const api = axios.create({
    baseURL: 'http://gsacpd045800n.sob.ad-grendene.com:3001'
})

const getPonto = (ponto) => api.post('points', ponto)

const apis = {
    getPonto
}

export default apis
