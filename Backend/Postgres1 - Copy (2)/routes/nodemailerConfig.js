// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or any other email service provider
//   auth: {
//     user: process.env.EMAIL, // Your email
//     pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
//   },
// });

// const mailOptions = {
//   from: process.env.EMAIL, // Sender email address
//   to: '', // Recipient email address
//   subject: 'OTP for Account Verification',
//   text: '', // OTP message
// };

// module.exports = { transporter, mailOptions };
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  subject: 'Hi , Welcome to Journey Jet ,OTP for Account Verification',
};

module.exports = { transporter, mailOptions };
