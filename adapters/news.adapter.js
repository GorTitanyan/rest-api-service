import db from "../models/index.model.js"

const NewsModel = db.news
const create = async (heading, text, path) => {
    const data = {
        heading,
        text,
        imageLink: path,
    }

    try{
       return await NewsModel.create(data)
    }catch(err){
        throw new Error("Cannot create the news. Something wrong with provided data!")
    }
}

const getNewsById = async (newsId) => {
    try{
        return await NewsModel.findOne({where: {id: newsId }})
    }catch(err){
        throw new Error("Cannot find news!")
    }
}


const getAllNews = async () => {
    try{
        // console.log(1)
        const allNews = await NewsModel.findAll()
        return allNews
    }catch(err){
        throw new Error("Something went wrong.Cannot find the news!")
    }
}


const destroyNews = async (newsId) => {
    try{
        const news= await NewsModel.findOne({where: {id: newsId}})
       await NewsModel.destroy({where: {id: newsId}})
       return news.imageLink
    }catch(err){
        throw new Error("cannot delete the news")
    }
}




const update = async (newsId) => {
    // try{
    //     const news= await NewsModel.findByPk(newsId)
    //     // console.log("++++++++++++++",news.dataValues);
    //     return news
    // }catch(err){
    //     throw new Error("Cannot update the news!")
    // }
}


// const findById = async (newsId) => {
//     try{
//         const news = await NewsModel.findById(newsId)
//         console.log(news);
//         return news
//     }catch(err){
//         throw new Error(err)
//     }
// }

export default {
    create,
    getNewsById,
    getAllNews,
    destroyNews,
    update
}