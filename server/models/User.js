
const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    authorized: { type: Boolean, default: false },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String },
    cart: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 }
    }],
    f_genre: [{ type: String }]

});


const Users = mongoose.model('Users', user);

module.exports = Users;

