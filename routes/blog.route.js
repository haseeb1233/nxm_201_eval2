const express = require("express")

const {BlogModel} =require("../model/blog.model")

const blogRouter = express.Router()


blogRouter.post("/add",(req,res) =>{
    const blog=req.body
    res.send(blog)
})



module.exports={
    blogRouter
}