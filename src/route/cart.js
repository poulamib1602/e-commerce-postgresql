const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../utilities/verifyToken");

const router = require("express").Router();
const cartController = require("../controller/cartController");

router.post("/create", verifyToken, cartController.create);

router.put("/:id", verifyTokenAndAuthorization, cartController.updatecart);

router.delete("/:id", verifyTokenAndAuthorization, cartController.deletecart);

router.get("/find/:userId", verifyTokenAndAuthorization, cartController.cartelement);

router.get("/", verifyTokenAndAdmin, cartController.allcart);

module.exports = router;