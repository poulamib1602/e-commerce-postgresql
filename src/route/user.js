const router = require("express").Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("../utilities/verifyToken");

const resetPassword = require("../controller/passwordController");
const userController = require("../controller/userController");

router.put("/:id", verifyTokenAndAuthorization, userController.update);
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);

router.post("/forget-password", resetPassword.forgetPassword);
router.post("/reset-password", resetPassword.reSetPassword);
router.post('/change-password', resetPassword.changePassword);
module.exports = router