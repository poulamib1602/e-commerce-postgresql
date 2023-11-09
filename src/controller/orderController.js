const knex = require("../middleware/database");
const response = require('../utilities/response');
const orderRepo = require("../repo/order");

const create = async (req, res) => {
  const { userId, productId, quantity, amount, address, status } = req.body;
  try {
    const neworder = await orderRepo.create({ userId, productId, quantity, amount, address, status })
    response.success(res, neworder);
  } catch (error) {
    response.error(res, error, 500);
  }
};

const updateorder = async (req, res) => {
  const { id } = req.params;
  const { userId, productId, quantity, amount, address, status } = req.body;
  try {
    const result = await orderRepo.update({ id, userId, productId, quantity, amount, address, status });
    response.success(res, {
      message: "order updated successfully",
      data: result,
    });
  } catch (error) {
    response.error(res, error, 500);
  }
};

const deleteorder = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCount = await orderRepo.remove({ id });
    if (deleteCount === 0) {
      return res.status(401).json({ message: "Unauthorized to delete others' order" });
    } else {
      response.success(res, {
        message: "order deleted successfully",
      });
    }
  } catch (error) {
    response.error(res, error, 500);
  }
};

const allorder = async (req, res) => {
  try {
    const order = await orderRepo.all();
    if (order.length === 0) {
      return res.status(404).json({ message: "No order found" });
    } else {
      response.success(res, order);
    }
  } catch (error) {
    response.error(res, error, 500);
  }
};

const orderelement = async (req, res) => {
  const { userId } = req.params;
  try {
    const orderele = await orderRepo.userorder({ userId });
    if (orderele.length === 0) {
      return res.status(404).json({ message: "No orderele found" });
    } else {
      response.success(res, orderele);
    }
  } catch (error) {
    response.error(res, error, 500);
  }
};

module.exports = {
  create,
  allorder,
  deleteorder,
  updateorder,
  orderelement
}


