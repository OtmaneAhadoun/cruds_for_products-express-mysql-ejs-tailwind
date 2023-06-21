const express=require('express')
const app=express()
const Router = require('./Router/productRouter')
app.set('view engine','ejs')
app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}))
app.use('/',Router)

app.listen(8080,()=>{
    console.log("its running on port"+8080);
}) 