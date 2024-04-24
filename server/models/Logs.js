const mongoose = require('mongoose');

const Logs=new mongoose.Schema({
    to:{type: 'string', required: true},
    level: {type: 'string', required: true},
    message:{type: 'string', required: true},
    createdAt: {
        type: 'string', 
        required: true,
        default: Date.now},
})

const Log = mongoose.model('Logs', Logs);

module.exports = Log;