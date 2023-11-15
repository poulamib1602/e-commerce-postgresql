const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../utilities/verifyToken");

const router = require("express").Router();
const orderController = require("../controller/orderController");

router.post("/", verifyToken, orderController.create);

router.put("/:id", verifyTokenAndAdmin, orderController.updateorder);

router.delete("/:id", verifyTokenAndAdmin, orderController.deleteorder);

router.get("/find/:userId", verifyTokenAndAuthorization, orderController.orderelement);

router.get("/", verifyTokenAndAdmin, orderController.allorder);

// GET MONTHLY invest os a user

// router.get("/invest", verifyTokenAndAdmin, orderController.userMonthlyInvest);

router.post('/confirm-order/:orderId', orderController.emailNotification);

module.exports = router;