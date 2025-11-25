const generateOtp = () => {
  const otpNum = 6; // number of digits
  return Number(
    Math.floor(Math.random() * 10 ** otpNum)
      .toString()
      .padStart(otpNum, '0')
  );
};

module.exports = { otp: generateOtp };