const jwt=require("jsonwebtoken")
require("dotenv").config()
const {UserModel} = require("../model/user.model")



const auth =(req,res,next) =>{
    const token = req.headers.authorization?.split(" ")[1]
    const secret_token =process.env.secret_token
  console.log((token,secret_token));
    try {
        if(token){
            jwt.verify(token,secret_token , function(err, decoded) {
                console.log(decoded) 
                res.send(decoded)
              });
        }
    
    } catch (error) {
        res.send({"msg":error.message})
    }


}


module.exports ={
    auth
}