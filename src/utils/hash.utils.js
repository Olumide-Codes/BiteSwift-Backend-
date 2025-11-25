const bcrypt = require('bcryptjs');

const hashPassword = async (password, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error('Failed to hash password.');
  }
};

const validatePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw new Error('Failed to validate password.');
  }
};

module.exports = { hashPassword, validatePassword };