"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user:"adfvadvadvadvad@gmail.com",
        pass:"lqjcjbgxgrudhtmc",
    },
});
module.exports = transporter;