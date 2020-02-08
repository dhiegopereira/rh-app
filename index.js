const cmd = require('node-cmd')

cmd.get(`npm start`,
    function(err, data, stderr){
        if (!err) {
           console.log('Success :\n\n',data)
        } else {
           console.log('error', err)
        }

    }
)