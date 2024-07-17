import express from "express";
import { Account } from "../db.js";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware.js";

export const accountRouter = express.Router()

accountRouter.get("balance", authMiddleware, async (req,res)=>{
    try {
        const account = await Account.findOne({
            userId: req.userId
        })
        const balance = account.balance
        return res.status(200).json({
            balance: balance
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message:"Invalid!"
        })
    }
})

accountRouter.post("/transfer", authMiddleware, async (req,res)=>{
    const session = await mongoose.startSession()

    session.startTransaction()
    const {to, amount} = req.body

    const fromAccount = await Account.findOne({
        userId: req.userId
    }).session(session)

    if(!fromAccount){
        return res.status(401).json({
            message:"Invalid Authentication"
        })
    }
    if(fromAccount.balance < amount){
        return res.status(403).json({
            message:"Insufficient funds!"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session)

    if(!toAccount){
        return res.status(404).json({
            message:"Invalid Account!"
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc:{balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    await session.commitTransaction()
    res.json({
        message:"Transfer successful!"
    })
})