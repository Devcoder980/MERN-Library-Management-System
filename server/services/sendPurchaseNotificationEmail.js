const { transporter } = require('../config/transporter');
const HTML_TEMPLATE = require('./templates/purchase_template');

async function sendPurchaseNotificationEmail(user, purchaseDetails) {
    try {
        const mailOptions = {
            from: '"Library Management System 👻" <library@example.com>',
            to: 'devcoder2323@gmail.com',
            subject: "Purchase Notification",
            text: `Dear ${user.name}, You have successfully made a purchase.`,
            html: HTML_TEMPLATE(user, purchaseDetails), // Assuming HTML_TEMPLATE is a function returning the HTML content of your email
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Purchase notification email sent successfully to user:", info.response);
    } catch (error) {
        console.error("Error occurred while sending purchase notification email to user:", error);
    }
}

module.exports = sendPurchaseNotificationEmail;
