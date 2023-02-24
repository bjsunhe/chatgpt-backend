const express = require('express')
const cors=require('cors')


require('./model')
const router = require('./router')
const errorHandler=require('./middleware/error-handler')


const app=express()


app.use(cors())
app.use(express.json())
app.use('/api',router)
app.use(errorHandler())


const PORT = 8080

app.listen(PORT,()=>{
    console.log(PORT)
})