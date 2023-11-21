const authRouter = require("./route/auth");
const userRouter = require("./route/user");
const productRouter = require("./route/product");
const cartRouter = require("./route/cart");
const orderRouter = require("./route/order");
const wishlistRouter = require("./route/wishlist");

module.exports = (app) => {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/product", productRouter);
  app.use("/cart", cartRouter);
  app.use("/order", orderRouter);
  app.use("/wishlist", wishlistRouter);
};
