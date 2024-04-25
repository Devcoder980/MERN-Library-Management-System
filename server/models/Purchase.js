const mongoose = require('mongoose');

// Define schema for Purchases Collection
const purchaseSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true
    },
    books: [{

        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book', // Reference to the Book model
            required: true,
        },
        // New fields to store book details
        bookTitle: {
            type: String,
            required: true
        },
        authorName: {
            type: String,
            required: true
        },
        units: {
            type: Number,
            required: true
        },
        price: {type: Number, required: true}
    }],
    total_price: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// Define model for Purchases Collection
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;