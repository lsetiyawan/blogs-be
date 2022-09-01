require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./src/user/user.route");
const articleRoute = require("./src/article/article.route");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./src/config/swagger");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("See documentation on : https://binar-blog-app.herokuapp.com/api-docs/#/");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(userRouter);
app.use(articleRoute);

app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
