const mongoose = require('mongoose');
const config = require('config');
const dbDebug = require('debug')('app:db');

if (!config.has('DB.password')) {
    dbDebug('DB password is not setted !');
    process.exit(0);
}

mongoose.connect('mongodb+srv://'+config.get('DB.username')+':'+config.get('DB.password')+config.get('DB.host'))
        .then( ()=> dbDebug('Mongo DB is UP !') )
        .catch( (err)=>dbDebug('Mongo DB is DOWN : '+err) );