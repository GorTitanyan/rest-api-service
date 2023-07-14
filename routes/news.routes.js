import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import upload from "../middlewares/multerConfig.js"
import newsController from '../controllers/news.controller.js';


const newsRouter = express.Router();

newsRouter.get("/",  isAuth,  newsController.getAllNews)
newsRouter.post("/",  isAuth, upload.single("picture"),  newsController.createNews)

newsRouter.get("/:newsId", isAuth,  newsController.getNewsById)
newsRouter.put("/:newsId", isAuth,upload.single("picture"), newsController.updateNews)
newsRouter.delete("/:newsId", isAuth, newsController.deleteNews)


export default newsRouter;