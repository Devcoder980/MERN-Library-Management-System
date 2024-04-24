const express = require('express');
const asyncHandler = require('express-async-handler');

const sendPurchaseNotificationEmail = require('../services/sendPurchaseNotificationEmail');
const sendReceiptEmail = require('../services/sendReceiptEmail');
const sendNewBookEmail = require('../services/sendNewBookEmail');

const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');


router.post('/send-new-book-email', asyncHandler(async (req, res) => {
    try {
        // Fetch email addresses of all users
        const users = await User.find({}, { email: 1,name:1, _id: 0 });
    
        // Fetch the latest book added to the database
        const book = await Book.findOne().sort({ created_at: -1 });
        console.log(book);
        // Construct email content
   
        

        // Send new book email to all users
        await sendNewBookEmail(users,book);

        // Respond with success message
        res.status(200).json({ message: 'New book emails sent successfully' });
    } catch (error) {
        // Handle errors
        console.error("Error sending new book email:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));

module.exports = router;


router.post('/send-purchase-notification-email', asyncHandler(async (req, res) => {
    try {
        const emailAddresses = await User.find({}, { email: 1, _id: 0 });
        const users = emailAddresses.map(emailObj => emailObj.email);
        await sendPurchaseNotificationEmail(users);
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
