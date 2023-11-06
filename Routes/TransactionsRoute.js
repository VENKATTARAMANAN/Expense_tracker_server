import express from "express";
import { transactionModel } from "../Models/Transaction.js";
import { decodeJwtToken } from "../Models/Users.js";
import moment from "moment";
const router = express.Router();

router.post("/add_transaction", async (req, res) => {
  try {
    const id = await decodeJwtToken(req.body.userid);
    const data = { ...req.body, userid: id.id };
    const addata = await transactionModel.create(data);
    res.status(200).json({ data: "Transaction addded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

router.post("/edit_transaction", async (req, res) => {
  try {
    const data=req.body;
    const addata = await transactionModel.findOneAndUpdate({_id:req.body._id},req.body);
   if(addata){
    res.status(200).json({ data: "Transaction updated successfully" });
   }
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

router.post("/get_all_transaction", async (req, res) => {
  const { selectrange, interval, type} = req.body;
  try {
    const id = await decodeJwtToken(req.body.token);
    if (interval !== "custom") {
      const getdata = await transactionModel.find({
        date: {
          $gt: moment().subtract(Number(req.body.interval), "d").toDate(),
        },
        userid: id.id,
        ...(type!=="all" && {type})
      });
      res.status(200).json({ data: getdata });
    } else {
      const getdatas = await transactionModel.find({
        date: {
          $gte:selectrange[0],
          $lte:selectrange[1]
        },
        userid: id.id,
        ...(type!=="all" && {type})
      });

      res.status(200).json({ data: getdatas });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});

router.delete("/delete_transaction/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const delete_transaction = await transactionModel.deleteOne({ _id: id });
    if (delete_transaction) {
      res.status(200).json({ data: "Transaction deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
});
export const transactionRouter = router;
