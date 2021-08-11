const bcrypt = require('bcrypt');

exports.encodingPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {}
};

exports.comparePassword = async (reqBodyPwd, dbUserPwd) => {
  return await bcrypt.compare(reqBodyPwd, dbUserPwd);
};
