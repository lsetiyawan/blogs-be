const { Router } = require("express");
const { checkSchema } = require("express-validator");
const tokenVerification = require("../middleware/token.verification");
const { validate } = require("../middleware/validation");
const articleController = require("./article.controller");
const { articleValidationObject } = require("./article.validation");

const articleRoute = Router();

articleRoute.get("/posts", articleController.getAllArticles);
articleRoute.get("/posts/:id", articleController.getSingleArticle);
articleRoute.post(
  "/posts",
  tokenVerification,
  checkSchema(articleValidationObject),
  validate,
  articleController.createArticle
);
articleRoute.put(
  "/posts/:postId",
  tokenVerification,
  checkSchema(articleValidationObject),
  validate,
  articleController.updateArticle
);

module.exports = articleRoute;
