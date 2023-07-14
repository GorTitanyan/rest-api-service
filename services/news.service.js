import newsAdapter from "../adapters/news.adapter.js"
import fileDeleter from "../utils/fileDel.js"
import db from '../models/index.model.js';
const NewsModel = db.users;


const createNews = async (heading, text, path) => {    
    const news = await newsAdapter.create(heading,text,path)
    if(news){
        return "News added!"
    }else{
        throw new Error("Cannot create the news!")
    }
}


const getNewsById = async (newsId) => {

    return await newsAdapter.getNewsById(newsId)    
}




const getAllNews = async () => {
    try{
        return await newsAdapter.getAllNews()   
    }catch(err){
        throw new Error("Cannot find all users!")
    }
}


const deleteNews = async (newsId) => {
    try{
        const imageLink = await newsAdapter.destroyNews(newsId)
        fileDeleter(imageLink)
    }catch(err){
        throw new Error("Cannot delete the user")
    }
}


const update = async (heading, text, imageLink, newsId) => {
    const news = await newsAdapter.getNewsById(newsId)
    const oldImageLink = news.dataValues.imageLink
    if(oldImageLink !== imageLink){
        fileDeleter(oldImageLink)
    }
    if(news){
        const result = await news.update({
            heading: heading,
            text: text,
            imageLink: imageLink,
          })
    }else{
        throw new Error("Cannot update the news!")
    }
}

export default {
    createNews,
    getNewsById,
    getAllNews,
    deleteNews,
    update
};
  