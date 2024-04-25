const { transporter } = require('../config/transporter');
const HTML_TEMPLATE = require('./templates/new_book_template');
const fs = require('fs');

async function sendNewBookEmail(users, book) {

    // // Read the image file as a buffer
    // const frontImageBuffer = fs.readFileSync(`C:/Users/shivani/Desktop/full stack/MERN-Library-Management-System/server/uploads/${book.images[0]}`);
    // const backImageBuffer = fs.readFileSync(`C:/Users/shivani/Desktop/full stack/MERN-Library-Management-System/server/uploads/${book.images[0]}`);

    try {
        for (const user of users) {
            const mailOptions = {
                from: '"Library Management System 👻" <library@example.com>',
                to: user.email,
                subject: "New Book Notification",
                text: `Dear ${user.name}, A new book titled "${book.title}" has been added to our library.`,
                html: HTML_TEMPLATE(user.name, book,), // Pass user name and book details to the HTML template function
                // attachments: [ // Include images as attachments
                //     {
                //         filename: 'front-cover.jpg',
                //         content: frontImageBuffer,
                //         contentType: 'image/jpeg',
                //     },
                //     {
                //         filename: 'back-cover.jpg',
                //         content: backImageBuffer,
                //         contentType: 'image/jpeg',
                //     },
                // ],
            };

            const info = await transporter.sendMail(mailOptions);
            console.log(`New book notification email sent successfully to ${user.email}:`, info.response);
        }
    } catch (error) {
        console.error("Error occurred while sending new book notification emails:", error);
    }
}

module.exports = sendNewBookEmail;
