const express = require('express');
const router = express.Router();
const wishlistController = require("../controller/wishlistController");

router.get('/:userId', wishlistController.getUserWishlist);

router.post('/:userId/:productId', wishlistController.addProductToWishlist);

router.delete('/:userId/:wishlistItemId', wishlistController.removeProductFromWishlist);

module.exports = router;
