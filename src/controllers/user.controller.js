const { signupService, loginService, otpService, resetPasswordService, verifyEmailService } = require('../services/user.service.js');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    res.status(200).json(data);
  } catch (e) {
    if (
      ['Email does not exist.', 'Incorrect email or password.', 'Email not verified. Please verify your email first.'].includes(e.message)
    ) {
      return res.status(401).json({ message: e.message });
    }
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = await signupService(name, email, password);
    res.status(201).json(data);
  } catch (e) {
    if (e.message === 'Email already exists and is verified.') {
      return res.status(409).json({ message: e.message });
    }
    console.error('Error:', e)
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};

const otp = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await otpService(email);
    res.status(200).json(data);
  } catch (e) {
    if (e.message === 'Email does not exist.') {
      return res.status(404).json({ message: e.message });
    }
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const data = await resetPasswordService(email, otp, newPassword);
    res.status(200).json(data);
  } catch (e) {
    if (['Incorrect OTP.', 'OTP has expired. Please request a new one.', 'Please provide a new password.'].includes(e.message)) {
      return res.status(400).json({ message: e.message });
    }
    if (e.message === 'User not found.') {
      return res.status(404).json({ message: e.message });
    }
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const data = await verifyEmailService(email, otp);
    res.status(200).json(data);
  } catch (e) {
    if (['Invalid OTP.', 'OTP has expired. Please request a new one.', 'User not found.'].includes(e.message)) {
      return res.status(400).json({ message: e.message });
    }
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
};

module.exports = { login, signup, otp, resetPassword, verifyEmail };