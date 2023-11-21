const router = require("express").Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../utilities/verifyToken");

const productController = require("../controller/productController");

router.post("/create", verifyTokenAndAdmin, productController.create);

router.put("/:id", verifyTokenAndAdmin, productController.updateprod);

router.delete("/:id", verifyTokenAndAdmin, productController.deleteprod);

router.get("/", productController.allprod);

router.get('/filter', productController.filterProduct);

router.get('/categories', productController.getAllCategories);

router.get('/categories/:category', productController.getProductsByCategory);

router.get('/search', productController.searchProduct);

router.post("/:id/review", verifyTokenAndAdmin, productController.insertProductReview);

router.get("/:id/review", verifyTokenAndAdmin, productController.allProductReview);

router.get('/:id/average-rating', verifyTokenAndAdmin, productController.averageRating);

module.exports = router;