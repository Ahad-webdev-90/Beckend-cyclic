"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "ahadmemon718@gmail.com",
        pass: "vexfavihavcdjwzo",
    },
    tls: {
        rejectUnauthorized: false,
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function info() {
    // send mail with defined transport object
    await transporter.sendMail({
        from: 'ahadmemon718@gmail.com', // sender address
        to: "aliaminidrees@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
}

module.exports = info
