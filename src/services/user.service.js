const mongoose = require('mongoose');
const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const { hashPassword, validatePassword } = require('../utils/hash.utils.js');
const { otp } = require('../utils/otp.util.js');
const { otpMail } = require('../utils/mailer.util.js');

const signupService = async (name, email, password) => {
  let user = await User.findOne({ email });

  if (user && user.isVerified) throw new Error('Email already exists and is verified.');
  if (user && !user.isVerified) await User.deleteOne({ email });

  const hashedPassword = await hashPassword(password, 10);
  const generatedOtp = otp();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    otp: generatedOtp,
    otpExpires,
    isVerified: false,
  });

  await newUser.save();

  try {
    await otpMail(email, generatedOtp);
  } catch (e) {
    throw new Error('Failed to send OTP email.');
  }

  return { msg: 'Signup successful. Please check your email for the OTP.' };
};

const verifyEmailService = async (email, otpCode) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found.');

  // Convert both to strings to avoid type mismatch
  if (String(user.otp) !== String(otpCode)) throw new Error('Invalid OTP.');
  
  if (Date.now() > user.otpExpires) throw new Error('OTP has expired. Please request a new one.');

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    msg: 'Email verified successfully.',
    token,
    user: { name: user.name, email: user.email }
  };
};

const loginService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email does not exist.');
  if (!user.isVerified) throw new Error('Email not verified. Please verify your email first.');

  const isValid = await validatePassword(password, user.password);
  if (!isValid) throw new Error('Incorrect email or password.');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { msg: 'Login successful.', token, user: { name: user.name, email: user.email } };
};

const otpService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email does not exist.');

  const generatedOtp = otp();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  try {
    await otpMail(email, generatedOtp);
  } catch (e) {
    throw new Error('Failed to send OTP email.');
  }

  user.otp = generatedOtp;
  user.otpExpires = otpExpires;
  await user.save();

  return { msg: 'Check your email for the OTP.' };
};

const resetPasswordService = async (email, otpCode, newPassword) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found.');
  if (user.otp !== otpCode) throw new Error('Incorrect OTP.');
  if (Date.now() > user.otpExpires) throw new Error('OTP has expired. Please request a new one.');
  if (!newPassword) throw new Error('Please provide a new password.');

  user.password = await hashPassword(newPassword, 10);
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { msg: 'Password changed successfully.', token, user: { name: user.name, email: user.email } };
};

module.exports = { signupService, loginService, otpService, resetPasswordService, verifyEmailService };