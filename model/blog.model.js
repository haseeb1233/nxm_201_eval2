const mongoose= require("mongoose")


const blogSchema = mongoose.Schema({
    tilte:String,
    author:String,
    des:String,
    userId:String
})


const BlogModel= mongoose.model("blog",blogSchema)


module.exports={
    BlogModel
}