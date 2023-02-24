const mongoose=require('mongoose')
const baseModel=require('./base-model')

const articleSchema=new mongoose.Schema({
    ...baseModel,
    title:{
        type:String,
        required:true
    },
    source:{
        type:String
    },
    content:{
        type:String
    },
    prompt:{
        type:String,
        required:true
    },
    result:{
        type:String
    },
    author:{
        type:String
    }
})

module.exports=articleSchema