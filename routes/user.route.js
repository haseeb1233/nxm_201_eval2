const express = require("express")
const {UserModel} = require("../model/user.model")
const bcrypt= require("bcrypt")
var jwt = require('jsonwebtoken')
require("dotenv").config()
const userRouter = express.Router()



// register
userRouter.post("/register", async (req,res) => {
   const {email,password}=req.body
   console.log(email,password)
  
    try {
         bcrypt.hash(password,5, async function(err, hash) {
            console.log(hash)
            req.body.password=hash
            const userdata = new UserModel(req.body)
            await userdata.save()
          res.send({"msg":"user registered suceessfully"})
        });
        
       
    } catch (error) {
        console.log(error)
        res.send({"msg":error.message})
    }

})


// login
userRouter.post("/login",async (req,res) =>{
   const {email,password}=req.body
   
   const user=await UserModel.find({email})

   if(user.length){
    bcrypt.compare(password,user[0].password, function(err, result) {
        if(result){
            const userid=user[0]._id.toString()
            console.log(userid)
            const token =  jwt.sign({userId:userid},process.env.secret_token,{expiresIn: 60 * 1000})

            const refresh_token =jwt.sign({ userId:userid},process.env.refresh_token,{expiresIn: 60 * 3000})
            res.send({"msg":"login sucessfulli","token":token,"refreshtoken":refresh_token})
        }else{
            res.send("wrong credentials")
        }
    })

   }else{
    res.send("register first")
   }


})



module.exports = {
    userRouter
}