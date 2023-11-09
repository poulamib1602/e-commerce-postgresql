const knex = require("../middleware/database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../utilities/response');

const update = async (req, res) => {
  const { userId, password, isAdmin, email } = req.body;
  const { id } = req.params;
  try {
    const user = await knex('users').where({ id }).first();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!(userId === id || isAdmin)) {
      return res.status(403).json('You can update only your account!');
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
    }
    const updatedUser = await knex("users")
      .where({ id })
      .update({ isAdmin, email })
      .returning("*");
    response.success(res, { message: 'Account has been updated', user: updatedUser });
  } catch (error) {
    response.error(res, error, 500);
  } finally {
    knex.destroy();
  }
};

const deleteUser = async (req, res) => {
  const { userId, isAdmin } = req.body;
  const { id } = req.params;
  try {
    const user = await knex('users').where({ id }).first();
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (userId === id || isAdmin) {
      await knex('users').where({ id }).del();
      return res.status(200).json("Account has been deleted");
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  } catch (error) {
    response.error(res, error, 500);
  } finally {
    knex.destroy();
  }
};

module.exports = {
  update,
  deleteUser
}