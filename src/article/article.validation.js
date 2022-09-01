const { body } = require("express-validator");

const articleValidationObject = {
  title: {
    in: ["body"],
    isString: true,
  },
  image: {
    in: ["body"],
    isURL: true,
  },
  body: {
    in: ["body"],
    isString: true,
  },
};

module.exports = {
  articleValidationObject,
};
