const mongoose = require('mongoose');

// Define schema for Books Collection
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price_mrp: {
        type: Number,
        required: true
    },
    units: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    discount_percentage: Number,
    language: {
        type: String,
        enum: ['Hindi', 'English']
    },
    category: String,
    pages: Number,
    binding: String,
    publisher: String,
    genre: String,
    isbn: {
        type: [String],
        unique: true // 
    },
    edition: String,
    contributors: [{
        author: String,
        author_info: String
    }],
    images: [String],
    frontImg: String,
    backImg: String,
});

// Define model for Books Collection
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
