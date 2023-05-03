const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const sessionStore = require("connect-mongodb-session")(session);

const productRouter = require("./routes/ProductsRouter");
const routerUser = require("./routes/UsersRouter");
const routerCard = require("./routes/CardRouter");
const routerOrder = require("./routes/OrderRouter");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000/" || "https://online-shop.onrender.com/",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/shopOnline",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use("/product", productRouter);
app.use("/user", routerUser);
app.use("/card", routerCard);
app.use("/order", routerOrder);

app.use(express.static(path.join(__dirname, "../front-end/my-app/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../front-end/my-app/build/index.html"));
});
app.listen(process.env.PORT || 3322, () =>
  console.log("Server Running on 3322")
);
