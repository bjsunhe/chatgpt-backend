const mongoose=require('mongoose')
const {dbUri} = require('../config/config.default')
const articleSchema=require('./article')



mongoose.connect(dbUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const db=mongoose.connection


db.on('error',error=>{
    console.log(error)
})

db.on('open',()=>{
    console.log('open')
})

module.exports={
    Article:mongoose.model('Article',articleSchema)
}