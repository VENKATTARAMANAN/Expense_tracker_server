import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import { dbConnection } from "./db.js";
import { userRouter } from "./Routes/user.js";
import { forgotpassRouter } from "./Routes/Forgotpassword.js";
import { transactionRouter } from "./Routes/TransactionsRoute.js";
dbConnection();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => res.send("Server is Running SuccessFully"));

app.use("/user",userRouter);
app.use("/forgot-pass",forgotpassRouter);
app.use("/transaction",transactionRouter);
app.listen(PORT, () => console.log("Server is Running Successfully", PORT));
