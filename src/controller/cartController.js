const knex = require("../middleware/database");
const response = require('../utilities/response');
const cartRepo = require("../repo/cart");

const create = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const newcart = await cartRepo.create({ userId, productId, quantity })
    response.success(res, newcart);
  } catch (error) {
    response.error(res, error, 500);
  }
};

const updatecart = async (req, res) => {
  const { id } = req.params;
  const { quantity, productId } = req.body;
  try {
    const result = await cartRepo.update({ id, quantity, productId });
    response.success(res, {
      message: "cart updated successfully",
      data: result,
    });
  } catch (error) {
    response.error(res, error, 500);
  }
};

const deletecart = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCount = await cartRepo.remove({ id });
    if (deleteCount === 0) {
      return res.status(401).json({ message: "Unauthorized to delete others' product" });
    } else {
      response.success(res, {
        message: "cart deleted successfully",
      });
    }
  } catch (error) {
    response.error(res, error, 500);
  }
};

const allcart = async (req, res) => {
  try {
    const product = await cartRepo.all();
    if (product.length === 0) {
      return res.status(404).json({ message: "No product found" });
    } else {
      response.success(res, product);
    }
  } catch (error) {
    response.error(res, error, 500);
  }
};

const cartelement = async (req, res) => {
  const { userId } = req.params;
  try {
    const cartele = await cartRepo.usercart({ userId });
    if (cartele.length === 0) {
      return res.status(404).json({ message: "No cartele found" });
    } else {
      response.success(res, cartele);
    }
  } catch (error) {
    response.error(res, error, 500);
  }
};

module.exports = {
  create,
  allcart,
  deletecart,
  updatecart,
  cartelement
}


