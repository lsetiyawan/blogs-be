const { Article } = require("../database/models");

class ArticleController {
  getAllArticles = async (req, res) => {
    return await Article.findAll();
  };

  getSingleArticle = async (req, res) => {
    const { id } = req.params;
    return await Article.findByPk(id);
  };
}

module.exports = new ArticleController;
