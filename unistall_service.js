const nodeWindows = require('node-windows')
const Service = nodeWindows.Service

const svc = new Service({
    //Nome do servico
    name:'NodeRhService',
    //Descricao que vai aparecer no Gerenciamento de serviço do Windows
    description: 'Serviço para Rh',
    //caminho absoluto do seu script
    script: 'C:\\Users\\cpd_diegog\\Documents\\Projetos\\Node\\services\\rh\\index.js'
})

svc.on('uninstall',function(){
    console.log('Uninstall complete.')
})

// Desistalar serviço.
svc.uninstall()