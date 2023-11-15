const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.from_email,
      pass: process.env.from_email_password,
    },
  });

module.exports = transporter;