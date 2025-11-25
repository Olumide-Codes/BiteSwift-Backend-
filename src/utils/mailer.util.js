const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const otpMail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Olumide" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2>Your OTP Code</h2>
          <p>Your one-time password is:</p>
          <div style="padding: 10px; background: #f4f4f4; border-radius: 5px; display: inline-block; font-size: 20px; font-weight: bold;">
            ${otp}
          </div>
          <p>This code will expire in 10 minutes. Do not share it with anyone.</p>
        </div>
      `,
    });
    console.log('OTP sent:', info.messageId);
  } catch (e) {
    console.error('Email error:', e.message);
    throw new Error('Failed to send OTP email.');
  }
};

module.exports = { otpMail };