import express from "express";
import { Users, decodeJwtToken, generateJwtToken } from "../Models/Users.js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ message: "Email already exist" });
    //generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    const date=new Date().toISOString();
   const value= date.slice(0,10);
    user = await new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedpassword,
      Actcreated_date:value,
    }).save();
    res.status(201).json({ data: "Successfully Registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ data: "Invalid Email" });
    }
    const validatePass = await bcrypt.compare(req.body.password, user.password);
    if(!validatePass){
        return res.status(400).json({data:"Invalid password"});
    }
    const token=generateJwtToken(user._id);
    res.status(200).json({data:"SuccessFully Logged In",token,name:user.name})
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

router.post("/getdata",async(req,res)=>{
  try {
    const id =await decodeJwtToken(req.body.token);
  if(id){
     const getdata=await Users.findOne({_id:(id.id)})
     if(!getdata.amount){
        res.status(400).json({data:"Initial amount not added"})
     }else{
      res.status(200).json({data:"Initial amount added"})
     }
  }else{
    res.status(400).json({data:"No user Found"})
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
})

export const userRouter = router;
