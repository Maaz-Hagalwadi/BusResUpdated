// // emailController.js

// const express = require('express');
// const router = express.Router();
// const { transporter, mailOptions } = require('./nodemailerConfig'); // Assuming emailConfig.js exports transporter and mailOptions

// // POST route to send email
// router.post('/', async (req, res) => {
//   const { recipientEmail, subject, text, html, attachments } = req.body;

//   // Override default mailOptions if provided in request body
//   const options = {
//     ...mailOptions,
//     to: recipientEmail,
//     subject: subject || mailOptions.subject,
//     text: text || mailOptions.text,
//     html: html || mailOptions.html,
//     attachments: attachments || mailOptions.attachments,
//   };

//   try {
//     // Send email using nodemailer transporter
//     const info = await transporter.sendMail(options);
//     console.log('Email sent:', info.response);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Failed to send email');
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { transporter, mailOptions } = require('./nodemailerConfig'); // Assuming emailConfig.js exports transporter and mailOptions

// // POST route to send email with PDF attachment
// router.post('/', async (req, res) => {
//   const { recipientEmail, subject, text, html, attachments } = req.body;

//   // Filter attachments to include only PDF files
//   const pdfAttachments = attachments.filter(attachment => attachment.contentType === 'application/pdf');

//   // Override default mailOptions if provided in request body
//   const options = {
//     ...mailOptions,
//     to: recipientEmail,
//     subject: subject || mailOptions.subject,
//     text: text || mailOptions.text,
//     html: html || mailOptions.html,
//     attachments: pdfAttachments || mailOptions.attachments, // Attach only PDF attachments
//   };

//   try {
//     // Send email using nodemailer transporter
//     const info = await transporter.sendMail(options);
//     console.log('Email sent:', info.response);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Failed to send email');
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { transporter, mailOptions } = require('./nodemailerConfig');

// router.post('/', async (req, res) => {
//   const { recipientEmail, pdfBase64 } = req.body;

//   if (!pdfBase64) {
//     return res.status(400).send('PDF data is required.');
//   }

//   const options = {
//     ...mailOptions,
//     to: recipientEmail,
//     subject: 'Your Booking Invoice',
//     text: 'Please find attached your booking invoice.',
//     attachments: [
//       {
//         filename: 'invoice.pdf',
//         content: pdfBase64.split('base64,')[1],
//         encoding: 'base64'
//       }
//     ]
//   };

//   try {
//     const info = await transporter.sendMail(options);
//     console.log('Email sent:', info.response);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Failed to send email');
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { transporter, mailOptions } = require('./nodemailerConfig');

// router.post('/', async (req, res) => {
//   const { recipientEmail, pdfBase64 } = req.body;

//   if (!pdfBase64) {
//     return res.status(400).send('PDF data is required.');
//   }

//   const options = {
//     ...mailOptions,
//     to: recipientEmail,
//     subject: 'Your Booking Invoice',
//     text: 'Please find attached your booking invoice.',
//     attachments: [
//       {
//         filename: 'invoice.pdf',
//         content: pdfBase64.split('base64,')[1],
//         encoding: 'base64'
//       }
//     ]
//   };

//   try {
//     const info = await transporter.sendMail(options);
//     console.log('Email sent:', info.response);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Failed to send email');
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const { transporter, mailOptions } = require('./nodemailerConfig');

router.post('/', async (req, res) => {
  const { recipientEmail, pdfBase64 } = req.body;

  if (!pdfBase64) {
    return res.status(400).send('PDF data is required.');
  }

  const options = {
    ...mailOptions,
    to: recipientEmail,
    subject: 'Your Booking Invoice',
    text: 'Please find attached your booking invoice.',
    attachments: [
      {
        filename: 'invoice.pdf',
        content: pdfBase64.split('base64,')[1],
        encoding: 'base64'
      }
    ]
  };

  try {
    const info = await transporter.sendMail(options);
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email: ' + error.message);
  }
});

module.exports = router;
