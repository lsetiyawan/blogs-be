const { Router } = require("express");
const { checkSchema } = require("express-validator");
const tokenVerification = require("../middleware/token.verification");
const { validate } = require("../middleware/validation");
const articleController = require("./article.controller");
const { articleValidationObject } = require("./article.validation");

const articleRoute = Router();
/**
 * @swagger
 * /posts:
 *  get:
 *    tags:
 *      - posts
 *    summary: API untuk mendapatkan seluruh post
 *    parameters:
 *      in: query
 *      name: writer
 *      schema:
 *        type: integer
 *      description: Numeric ID of the writer
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */
articleRoute.get("/posts", articleController.getAllArticles);

/**
 * @swagger
 * /posts/{postId}:
 *  get:
 *    tags:
 *      - posts
 *    summary: API untuk mendapatkan seluruh post
 *    parameters:
 *      in: path
 *      name: postId
 *      schema:
 *        type: integer
 *      description: Numeric ID of the writer
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */
articleRoute.get("/posts/:id", articleController.getSingleArticle);

/**
 * @swagger
 * /posts:
 *  post:
 *    security:
 *      - bearerAuth : []
 *    tags:
 *      - posts
 *    summary: API untuk create post
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: Judulnya
 *              image:
 *                type: url
 *                example: http://www.goog.com/gambar.jpg
 *              body:
 *                type: string
 *                example: inibodynya
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
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
