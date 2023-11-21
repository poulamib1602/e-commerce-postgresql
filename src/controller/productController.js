const knex = require("../middleware/database");
const response = require('../utilities/response');
const productRepo = require("../repo/product");
const ratingRepo = require("../repo/rating");
const { Container } = require("winston");
const { Console } = require("winston/lib/winston/transports");

const create = async (req, res) => {
  const { name, description, brand, price, category, image, cart } = req.body;
  try {
    const newProduct = await productRepo.create({ name, description, brand, price, category, image, cart })
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
        message: "Deleted product successfully",
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

const filterProduct = async (req, res) => {
  try {
    let query = knex('product').select('*');
    const { category, priceRange, brand } = req.query;
    if (category) {
      query = applyFilter(query, 'category', category);
    }
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-');
      query = applyFilter(query, 'price', 'range', [minPrice, maxPrice]);
    }
    if (brand) {
      query = applyFilter(query, 'brand', brand);
    }
    const result = await query;
    response.success(res, result);
  } catch (error) {
    response.error(res, error, 500);
  }
};

function applyFilter(query, field, value, range = null) {
  if (range) {
    return query.whereBetween(field, range);
  } else {
    return query.where(field, value);
  }
};

const searchProduct = async (req, res) => {
  try {
    const { name, category } = req.query;
    const searchResults = await knex('product').select('*').where('name', name).orWhere('category', category);
    response.success(res, searchResults);
  } catch (error) {
    response.error(res, error, 500);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await knex('product').distinct('category');
    response.success(res, categories);
  } catch (error) {
    response.error(res, error, 500);
  }
};

const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await knex('product').select('name').where({ category });
    response.success(res, products);
  } catch (error) {
    response.error(res, error, 500);
  }
};

const insertProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, reviewText } = req.body;
    const userId = req.user.id;
    const newReview = await ratingRepo.createProductReview(id, userId, rating, reviewText);
    response.success(res,newReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const allProductReview = async (req, res) => {
  const { id } = req.params;
  try {
    const productReviews = await ratingRepo.getProductReviews(id);
    response.success(res,productReviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const averageRating = async (req, res) => {
  const { id } = req.params;
  try {
    const averageRating = await ratingRepo.calculateAverageRating(id);
    response.success(res,{ averageRating });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  create,
  allprod,
  deleteprod,
  updateprod,
  filterProduct,
  getAllCategories,
  getProductsByCategory,
  searchProduct,
  insertProductReview,
  allProductReview,
  averageRating
}