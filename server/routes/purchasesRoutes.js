const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Purchase = require('../models/Purchase.js');
const Book = require('../models/Book.js'); // Import the Book model
const { verifyToken } = require('../middleware/authMiddleware.js');
// CREATE: Route to add a new purchase
router.post('/purchases', verifyToken, asyncHandler(async (req, res) => {
    try {
        const { user_email, books, total_price } = req.body;

        // Create a new purchase
        const purchase = new Purchase({
            user_email,
            books,
            total_price
        });

        // Update stock quantity of purchased books
        for (const { book: bookId, units } of books) {
            await Book.findByIdAndUpdate(bookId, { $inc: { units: -units } }); // Decrement units from stock
        }

        // Save the purchase to the database
        await purchase.save();

        res.status(201).json({ message: 'Purchase added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));


// READ: Route to retrieve all purchases for a specific user email
router.get('/purchases', asyncHandler(async (req, res) => {
    try {
        const { user_email } = req.query; // Extract user_email from query parameters
        if (!user_email) {
            return res.status(400).json({ error: 'User email is required' });
        }

        const purchases = await Purchase.find({ user_email }); // Find purchases for the specified user email
        res.status(200).json({ purchases });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));


module.exports = router;
