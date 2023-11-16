const router = require("express").Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../utilities/verifyToken");

const resetPassword = require("../controller/resetPassword");
const userController = require("../controller/userController");

router.put("/:id", verifyTokenAndAuthorization, userController.update);
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);

router.post("/forget-password", resetPassword.forgetPassword);
router.post("/reset-password", resetPassword.changePassword);

module.exports = router