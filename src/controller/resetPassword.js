const knex = require("../middleware/database");
const bcrypt = require('bcrypt');
require("dotenv").config();
const sendEmail = require("../utilities/email");

const generateResetToken = (password) => {
  return process.env.JWT_SEC + password;
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(401).send({ status: false, message: "Enter Your Email" })
  }

  const userDetails = await knex('users').where({ email }).first();
  if (!userDetails.id) {
    return res.status(401).send({ status: false, message: "user not found" })
  }

  const resetToken = generateResetToken(userDetails.password);
  const resetTokenExpiresAt = new Date();
  resetTokenExpiresAt.setHours(resetTokenExpiresAt.getHours() + 1);

  try {
    await knex('users')
      .where('email', email)
      .update({
        reset_token: resetToken,
        reset_token_expires_at: resetTokenExpiresAt,
      });

    await sendEmail({
      email: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:4000/user/reset-password?token=${resetToken}`
    });

    res.status(200).json({ message: 'Reset link sent successfully.', "resetToken": resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const changePassword = async (req, res) => {
  const { token } = req.query;
  const { email, newPassword } = req.body;
  console.log(".....", token, email, newPassword)
  try {
    const user = await knex('users')
      .where('email', email)
      .andWhere('reset_token', token)
      .andWhere('reset_token_expires_at', '>', new Date())
      .first();

    const salt = await bcrypt.genSalt(10);
    if (user) {
      await knex('users').where('email', email).update({
        password: await bcrypt.hash(newPassword, salt),
        reset_token: null,
        reset_token_expires_at: null,
      });

      await sendEmail({
        email: email,
        subject: 'Reset Completed',
        text: 'Password reset done succesfully!!'
      });

      res.status(200).json({ message: 'Password reset successfully.' });
    } else {
      res.status(400).json({ error: 'Invalid or expired token.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { forgetPassword, changePassword }; 