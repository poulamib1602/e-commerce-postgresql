const knex = require("../middleware/database");
const response = require('../utilities/response');
const productRepo = require("../repo/product");

const create = async (req, res) => {
  const { name, description, price, category, image, cart } = req.body;
  try {
    const newProduct = await productRepo.create({ name, description, price, category, image, cart })
    response.success(res, newProduct);
  } catch (error) {
    response.error(res, error, 500);
  }
};

const updateprod = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image, cart } = req.body;
  try {
    const result = await productRepo.update({ id, name, description, price, category, image, cart });
    response.success(res, {
      message: "Post updated successfully",
      data: result,
    });
  } catch (error) {
    response.error(res, error, 500);
  }
};

const deleteprod = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCount = await productRepo.remove({ id });
    if (deleteCount === 0) {
      return res.status(401).json({ message: "Unauthorized to delete others' product" });
    } else {
      response.success(res, {
        message: "Post product successfully",
      });
    }
  } catch (error) {
    response.error(res, error, 500);
  }
};

const allprod = async (req, res) => {
  try {
    const product = await productRepo.allprod();
    if (product.length === 0) {
      return res.status(404).json({ message: "No product found" });
    } else {
      response.success(res, product);
    }
  } catch (error) {
    response.error(res, error, 500);
  }
};

module.exports = {
  create,
  allprod,
  deleteprod,
  updateprod
}