const mongoose = require('mongoose');

const Emails=new mongoose.Schema({
    to:{type: 'string', required: true},
    subject: {type: 'string', required: true},
    body:{type: 'string', required: true},
    createdAt: {
        type: 'string', 
        required: true,
        default: Date.now
    },
})

const Email = mongoose.model('Emails', Emails);

module.exports = Email;