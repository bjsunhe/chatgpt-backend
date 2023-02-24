const express=require('express')
const router=express.Router()
const {body,validationResult} = require('express-validator')

const {addArticle,showArticles} = require('../controller/article')




router.post('/add-article',[
    body('title').notEmpty(),
    body('prompt').notEmpty()

],(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    next()
},addArticle)
router.post('/show-articles',[],(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    next()
},showArticles)

// tag
module.exports=router