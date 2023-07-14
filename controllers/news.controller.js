import newsService from "../services/news.service.js"


const createNews = async (req, res) =>{
    const {heading, text} = req.body
    const image = req.file
    try{
        if(!image || !heading || !text){
            throw new Error("Something wrong with provided data!")
        }

        const result = await newsService.createNews(heading,text,image.path)
        
        res.status(200).json({
            message: result
        })
    }catch(err){
        res.status(500).json({
            error: err + ""
        })
    }
}


const getNewsById = async (req, res) => {
    const { newsId } = req.params
    try{
        const news = await newsService.getNewsById(newsId)
        if(news){
            res.status(200).json({
                news: news
            })
        }else{
            throw new Error("Cannot find the news!")
        }
      
    }catch(err){
        res.status(500).json({
            error: err + ""
        })
    }
}


const getAllNews = async (req, res) => {
    try{
        const allNews = await newsService.getAllNews()
        res.status(200).json({
            allNews: allNews
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}


const deleteNews = async (req, res) => {
    const { newsId } = req.params
    try{
        await newsService.deleteNews(newsId)
        res.status(200).json({
            message: "The news was successfully deleted"
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}



const updateNews = async (req, res) => {
    const {heading, text} = req.body
    const image = req.file
    const { newsId } = req.params
    try{
        await newsService.update(heading,text, image.path, newsId)
        res.status(200).json({
            message: "The news was successfully updated"
        })
    }catch(err){
        res.status(500).json({
            error: err
        })
    }
}

export default {
    createNews,
    getNewsById,
    getAllNews,
    deleteNews,
    updateNews
}