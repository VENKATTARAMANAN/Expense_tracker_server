import mongoose from "mongoose";
import * as dotenv from "dotenv"
dotenv.config();

export function dbConnection(){
    const Mongo_URL=process.env.MONGO_CONNECT_URL;
    const params={
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
try {
    mongoose.connect(Mongo_URL,params)
    console.log("Mongodb connected successfully");
} catch (error) {
    console.log("Internal server error",error);
}
}
