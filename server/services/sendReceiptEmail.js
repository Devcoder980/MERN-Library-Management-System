const { transporter } = require('../config/transporter');
const HTML_TEMPLATE = require('./templates/receipt_template');

async function sendReceiptEmail(user, purchaseDetails) {
    try {
        const mailOptions = {
            from: '"Library Management System 👻" <library@example.com>',
            to: 'devcoder2323@gmail.com',
            subject: "Purchase Receipt",
            text: `Dear , Please find your purchase receipt attached.`,
            html: HTML_TEMPLATE(user, purchaseDetails), // Assuming HTML_TEMPLATE is a function returning the HTML content of your email
            // attachments: [
            //     {
            //         filename: 'receipt.pdf', // Assuming the receipt is in PDF format
            //         path: '/path/to/receipt.pdf', // Replace with the actual path of the receipt file
            //     },
            // ],
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Purchase receipt email sent successfully to user:", info.response);
    } catch (error) {
        console.error("Error occurred while sending purchase receipt email to user:", error);
    }
}

module.exports = sendReceiptEmail;
