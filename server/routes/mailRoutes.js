const express = require('express');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const newObjectId = new mongoose.Types.ObjectId();

const sendPurchaseNotificationEmail = require('../services/sendPurchaseNotificationEmail');
const sendReceiptEmail = require('../services/sendReceiptEmail');
const sendNewBookEmail = require('../services/sendNewBookEmail');

const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const Purchase = require('../models/Purchase');

router.post('/send-new-book-email', asyncHandler(async (req, res) => {
    try {
        // Fetch email addresses of all users
        const users = await User.find({}, { email: 1, name: 1, _id: 0 });

        // Fetch the latest book added to the database
        const book = await Book.findOne().sort({ created_at: -1 });
        console.log(book);
        // Construct email content



        // Send new book email to all users
        await sendNewBookEmail(users, book);

        // Respond with success message
        res.status(200).json({ message: 'New book emails sent successfully' });
    } catch (error) {
        // Handle errors
        console.error("Error sending new book email:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));



router.post('/send-purchase-notification-email', asyncHandler(async (req, res) => {
    try {

        const data = await Purchase.findById({ '_id': req.body.Id });// Constructing the query object

        const email = data.user_email;
        const user = await User.findOne({ email: email }); // Correct usage of findOne with an object as parameter

        if (!data) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        await sendPurchaseNotificationEmail(data, user);
        res.status(200).json({ message: 'Purchase notification emails sent successfully' });
    } catch (error) {
        console.error("Error sending purchase notification email:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));



router.post('/send-receipt-email', asyncHandler(async (req, res) => {
    try {

        await sendReceiptEmail();
        res.status(200).json({ message: 'Receipt emails sent successfully' });
    } catch (error) {
        console.error("Error sending receipt email:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));

module.exports = router;
