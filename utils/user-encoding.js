const bcrypt = require('bcrypt');

// Encoding password
exports.encodingPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {}
};

// Compare password in DB with yours
exports.comparePassword = async (reqBodyPwd, dbUserPwd) => {
  return await bcrypt.compare(reqBodyPwd, dbUserPwd);
};
