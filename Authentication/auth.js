import * as dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken";

const isAuthenticated=(req,res,next)=>{

 const token=req.headers.authorisation;
 if(!token){
   return res.status(400).json({data:"Invalid Token"})
 } 
 else{
    jwt.verify(token,process.env.SECRET_KEY);
    next();
 }  
}
export {isAuthenticated};