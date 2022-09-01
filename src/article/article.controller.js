const { Article } = require("../database/models");
const { Op } = require("sequelize");

class ArticleController {
  getAllArticles = async (req, res) => {
    const { writer } = req.query;
    const query = {};
    if (writer) {
      query.user_id = { [Op.eq]: writer };
    }
    const allArticles = await Article.findAll({
      where: query,
    });
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

  createArticle = async (req, res) => {
    const { id } = req.auth;
    const { title, image, body } = req.body;
    try {
      const createArticle = await Article.create({
        title,
        image,
        body,
        user_id: id,
      });
      return res.status(201).json(createArticle);
    } catch (err) {
      return res.status(500).json({ message: "Error when create an article" });
    }
  };

  updateArticle = async (req, res) => {
    const { id } = req.auth;
    const { postId } = req.params;
    const { title, image, body } = req.body;
    try {
      const article = await Article.findByPk(postId);
      if (article.user_id != id) {
        return res.status(401).json({ message: "Not allowed to edit" });
      }
      const updateArticle = await Article.update(
        {
          title,
          image,
          body,
        },
        {
          where: {
            id: postId,
          },
        }
      );
      return res.status(201).json({ message: "Update success!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error when update an article" });
    }
  };
}

module.exports = new ArticleController();
