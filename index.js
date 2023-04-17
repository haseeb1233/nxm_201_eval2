const express = require("express")
require("dotenv").config()
const {connection} = require("./db")
const { userRouter} = require("./routes/user.route")
const {auth} = require("./middleware/auth.middleware")
const {blogRouter} = require("./routes/blog.route")
const {blacklist}=require("./blacklist")

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/users",userRouter)

app.get("/newtoken",(res,req)=>{
    const refresh_token=req.headers.authorization?.split(" ")[1]
    if(refresh_token){
        const token =  jwt.sign({userId:userid},process.env.secret_token,{expiresIn: 60 * 1000})
        res.send(token)
    } 
})


app.use(auth)
app.use("/blog",blogRouter)



app.get("logout",(req,res)=>{
    const token =req.headers.authorization?.split(" ")[1]
    blacklist.push(token)
    res.send("logoutsuccefully")
})


app.listen(process.env.port,async() =>{
    try {
        await connection
        console.log("connected to mongodb")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`connected to ${process.env.port}`)
})

