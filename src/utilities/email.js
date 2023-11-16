const nodemailer = require('nodemailer');
require("dotenv").config();

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.from_email,
      pass: process.env.from_email_password,
    },
  });
  const mailOptions = {
    from: process.env.from_email,
    to: option.email,
    subject: option.subject,
    text: option.text,
  };
  console.log("mail .. ", mailOptions)
  await transporter.sendMail(mailOptions);
}
module.exports = sendEmail;