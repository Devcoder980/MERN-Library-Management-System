const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "pbind4545@gmail.com",
        pass: "eptg xytk wsxe waet",
        
        
    },
});


// Export transporter and sendEmail function
module.exports = { transporter };