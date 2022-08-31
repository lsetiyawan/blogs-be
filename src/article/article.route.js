const { Router } = require("express");
const articleController = require("./article.controller");

const articleRoute = Router();

articleRoute.get("/posts", articleController.getAllArticles);
articleRoute.get("/posts/:id", articleController.getSingleArticle);

module.exports = articleRoute;
