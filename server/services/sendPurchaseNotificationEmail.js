const { transporter } = require('../config/transporter');
const HTML_TEMPLATE = require('./templates/purchase_template');

async function sendPurchaseNotificationEmail(data,user) {
    try {
        const userEmail = data.user_email;
        const totalPrice = data.total_price;
        const mailOptions = {
            from: '"Library Management System 👻" <library@example.com>',
            to: userEmail,
            subject: "Purchase Notification",
            text: `Dear ${user.name}, You have successfully made a purchase.`,
            html: HTML_TEMPLATE(data, totalPrice,user),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Purchase notification email sent successfully to user:",info.response);
    } catch (error) {
        console.error("Error occurred while sending purchase notification email to user:", error);
    }
}

module.exports = sendPurchaseNotificationEmail;
