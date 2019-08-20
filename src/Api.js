import axios from 'axios'

const api = axios.create({
    baseURL: 'http://iis2k8sob/PORTALRH/WebServices/Pessoais.asmx'
})

const getPonto = (ponto) => api.get(`PesquisaPontoAtual?sCodigo=${ponto.mat}&sDataIni=${ponto.dat}&sDataFim=${ponto.dat}&sUnidade=SOB&bCompletaMarcacoes=TRUE`)

const apis = {
    getPonto
}

export default apis
