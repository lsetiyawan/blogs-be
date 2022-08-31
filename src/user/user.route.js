const { Router } = require("express");
const { checkSchema } = require("express-validator");
const { validate } = require("../middleware/validation");
const UserController = require("./user.controller");
const {
  registrationValidationObject,
  loginValidationObject,
} = require("./user.validation");

const userRouter = Router();

userRouter.post(
  "/registration",
  checkSchema(registrationValidationObject),
  validate,
  UserController.createUser
);

userRouter.post(
  "/login",
  checkSchema(loginValidationObject),
  validate,
  UserController.userLogin
);

module.exports = userRouter;
