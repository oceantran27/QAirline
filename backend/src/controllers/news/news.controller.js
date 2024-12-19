import News from "../../models/news/news.model";
import {
  dbGetAllNews,
  dbGetNews,
  dbCreateSingleNews,
  dbCreateNews,
  dbUpdateNews,
  dbDeleteNews,
  dbGetNewsByStatus,
} from "../../services/news/news.service";

export const getAllNews = async (req, res) => {
  try {
    const news = await dbGetAllNews();
    res.status(200).send({
      data: news,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getNews = async (req, res) => {
  try {
    const newsId = req.query.id;
    const news = await dbGetNews(newsId);

    if (!news) {
      return res.status(404).send({
        message: "News not found",
      });
    }

    res.status(200).send({
      data: news,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const createNews = async (req, res) => {
  try {
    const news = new News(req.body);

    const imageUrl = req.file.path;
    news.image = imageUrl;
    news.createdAt = new Date();
    news.updatedAt = new Date();

    await dbCreateSingleNews(news);

    res.status(201).send({
      message: "News created successfully",
      data: news,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const createBulkNews = async (req, res) => {
  try {
    const newsArray = req.body;
    newsArray.forEach((news) => {
      news.createdAt = new Date();
      news.updatedAt = new Date();
    });

    await dbCreateNews(newsArray);
    res.status(201).send({
      message: "News created successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const updateNews = async (req, res) => {
  try {
    const newsId = req.query.id;
    const updateData = req.body;
    await dbUpdateNews(newsId, updateData);
    res.status(200).send({
      message: "News updated successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const newsId = req.query.id;
    await dbDeleteNews(newsId);
    res.status(200).send({
      message: "News deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const getNewsByStatus = async (req, res) => {
  try {
    const status = req.query.status;
    const news = await dbGetNewsByStatus(status);

    if (!news.length) {
      return res.status(404).send({
        message: "No news found with the given status",
      });
    }

    res.status(200).send({
      data: news,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
