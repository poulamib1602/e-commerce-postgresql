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

module.exports = router;