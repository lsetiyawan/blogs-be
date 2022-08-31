require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./src/user/user.route");
const articleRoute = require("./src/article/article.route");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.use(userRouter);
app.use(articleRoute);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
