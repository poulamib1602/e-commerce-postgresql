const express = require('express');
const logger = require('./utilities/logger');
const helmet = require("helmet");
const morgan = require("morgan");
const authRouter = require("./route/auth");
const userRouter = require("./route/user");
const productRouter = require("./route/product");
const cartRouter = require("./route/cart");
const orderRouter = require("./route/order");

require("./middleware/database");
require("./middleware/schema");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);

});