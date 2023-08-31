const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
const DBconnection = require("./config/DBconnection");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orederRoutes");
// const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware') ;

app.use(express.json());

dotenv.config();


DBconnection();

// using cors for production
var cors = require('cors')
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/config/paypal", (req, res) => {
  //  Note , we dont remove {} yet
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// router
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.use(express.static("client/build"));
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

// original url error
app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Not Found ${req.originalUrl}`));
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(
    `Example app listening on ${process.env.NODE_ENV} mode , port ${PORT}`
  );
});
