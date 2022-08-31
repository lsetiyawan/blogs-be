const { Article } = require("../database/models");

class ArticleController {
  getAllArticles = async (req, res) => {
    const allArticles = await Article.findAll();
    return res.status(200).json(allArticles);
  };

  getSingleArticle = async (req, res) => {
    const { id } = req.params;
    try {
      const singleArticle = await Article.findByPk(id);
      if (singleArticle) {
        return res.status(200).json(singleArticle);
      }
      return res.status(404).json({ message: "Article was not found" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error when fetching single article" });
    }
  };
}

module.exports = new ArticleController();
