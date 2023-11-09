const router = require("express").Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../utilities/verifyToken");

const userController = require("../controller/userController");

router.put("/:id", verifyTokenAndAuthorization, userController.update);
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);

module.exports = router
