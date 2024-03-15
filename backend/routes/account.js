const express = require('express')
const { Account } = require('../db')
const zod = require('zod')
const authMiddleware = require('../middleware')
const { default: mongoose, isValidObjectId } = require('mongoose')
const router = express.Router()

router.use(express.json())

router.get('/balance', authMiddleware, async (req, res) => {
    // console.log(req.userId);
    const account = await Account.find({
        userId: req.userId
    })
    res.json({
        balance: account[0].balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction(); // Start the transaction

    try {
        const userId = req.userId;
        const { amount, to } = req.body;
        const fromAccount = await Account.findOne({ userId:  userId }).session(session);

        if (!fromAccount || fromAccount.balance < amount || fromAccount.balance <= 0) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }
        if(!isValidObjectId(to)){
            return res.status(400).json({ message: "Invalid ID" });
        }
        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid account" });
        }

        await Account.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ message: error.message || "An error occurred" });
    } finally {
        session.endSession();
    }
})

module.exports = router