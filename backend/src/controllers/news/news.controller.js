import {
  deleteCache,
  getCache,
  newsCache,
  setCache,
} from "../../cache/cacheManager.js";
import News from "../../models/news/news.model.js";
import {
  dbGetAllNews,
  dbGetNews,
  dbCreateSingleNews,
  dbCreateNews,
  dbUpdateNews,
  dbDeleteNews,
  dbGetNewsByStatus,
} from "../../services/news/news.service.js";

export const getAllNews = async (req, res) => {
  try {
    const cachedNews = getCache(newsCache, "news");
    if (cachedNews) {
      return res.status(200).send({
        data: cachedNews,
      });
    }

    const news = await dbGetAllNews();
    setCache(newsCache, "news", news);

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

    const newsCache = getCache(newsCache, newsId);
    if (newsCache) {
      return res.status(200).send({
        data: newsCache,
      });
    }

    const news = await dbGetNews(newsId);

    if (!news) {
      return res.status(404).send({
        message: "News not found",
      });
    }

    setCache(newsCache, newsId, news);

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

    const newsCache = getCache(newsCache, "news");
    if (newsCache) {
      newsCache.push(news);
      setCache(newsCache, "news", newsCache);
    }

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

    const newsCache = getCache(newsCache, newsId);
    if (newsCache) {
      deleteCache(newsCache, newsId);
    }

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

    const newsCache = getCache(newsCache, newsId);
    if (newsCache) {
      deleteCache(newsCache, newsId);
    }

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
