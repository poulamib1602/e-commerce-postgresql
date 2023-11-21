const knex = require("../middleware/database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../utilities/response');

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const [userId] = await knex('users').insert({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    }).returning('id');
    const user = {
      id: userId,
      username: req.body.username,
      email: req.body.email,
    };
    return response.success(res, user);
  } catch (error) {
    return response.error(res, error, 500);
  } finally {
    knex.destroy();
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await knex('users').where({ email }).first();
    if (!user) {
      db.destroy();
      return response.custom(res, { message: 'User not found' }, 404);
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      db.destroy();
      return response.custom(res, { message: 'Wrong password' }, 400);
    }
    const accessToken = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );
    const { password: userPassword, ...others } = user;
    knex.destroy();
    return response.custom(res, { message: 'Login successfully', ...others, accessToken });
  } catch (error) {
    return response.error(res, error, 500);
  }
};

module.exports = {
  login,
  register
}