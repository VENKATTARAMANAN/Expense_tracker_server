import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Actcreated_date: {
    type: String,
  },
  otp:{
    type:String,
  },
  token:{
    type:String,
  },

});

export const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

export const decodeJwtToken=(token)=>{
  return jwt.decode(token)
}

const Users = mongoose.model("users-collection", userSchema);
export { Users };
