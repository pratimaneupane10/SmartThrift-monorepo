const nodemailer = require('nodemailer');

// Reusable email sender. Configure via .env (Mailtrap SMTP credentials by default).
const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'no-reply@thriftmarket.com',
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;