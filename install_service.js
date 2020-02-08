const nodeWindows = require('node-windows')
const Service = nodeWindows.Service


const svc = new Service({
    //Nome do servico
    name:'Rh',
    //Descricao que vai aparecer no Gerenciamento de serviço do Windows
    description: 'Serviço para API do Rh',
    //caminho absoluto do seu script
    script: 'C:\\Users\\cpd_diegog\\Documents\\Projetos\\Node\\rh\\index.js'
})

svc.on('install',function(){
    svc.start()
})

// instalando o servico
svc.install()