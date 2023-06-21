
const Product = require('../model/Product')
const Router=require('express').Router()
Router.get('/',async (req,res)=>{
    const rows= await Product.all()
    res.render('home',{rows})
})
Router.get('/search', async(req,res)=>{
    const {title}=req.query
    const products=await Product.search(title)
    const rows=products.map(e=>{
        e.title=e.title.replace(title,`<strong class=' text-white'>${title}</strong>`)
        return e
    })
    res.render('home',{rows})
})
Router.get('/product/add',async(req,res)=>{
    res.render('add',{page:'add new product'})
})
Router.post('/product',async(req,res)=>{
    const product={...req.body}
    const inserted= await Product.Insert(product)
    if(inserted){
        return res.redirect('/')
    }
    res.redirect('/product/add')
})
Router.get('/drop/:id',async(req,res)=>{
    const {id}=req.params
    const result=await Product.delete(id)
    if(result){
        res.redirect('/')
    }
})
Router.get('/product/update/:id',async(req,res)=>{
    const {id}=req.params
    const product=await Product.find(id)
    const action='/product/update'
    res.render('add',{product,action,page:'update'})
})
Router.post('/product/update',async(req,res)=>{
    const {id}=req.body
    delete req.body.id 
    const product={...req.body}
    await Product.update(product,id)
    res.redirect('/')
})
Router.post('/insert',async (req,res)=>{
    const {title,description,price,quantity,category}=req.body
    const product=new Product(title,description,price,quantity,category)
    const result=await product.save()
    res.json(result)
})

module.exports=Router
