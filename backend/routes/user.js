const express = require('express')
const zod = require('zod')
const { User, Account } = require('../db')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')
const authMiddleware = require('../middleware')
const router = express.Router()

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

//signup
router.post('/signup', async(req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: body.username
    })
    // console.log(user);
    if(user){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    // console.log("body", body);
    const dbUser = await User.create(body)
    // console.log("db", dbUser);
    // Account.userId = dbUser.userId
    const userId = dbUser._id;
    await Account.create({
        userId,
        balance: Math.floor(Math.random() * (10000 - 1) + 1)
    })
    const token = jwt.sign({
        userId: userId
    }, JWT_SECRET)
    return res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

//signin
router.post('/signin', async(req, res) => {
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }
    const user = await User.findOne({
        username: body.username,
        password: body.password
    })
    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        return res.status(200).json({
            token: token
        })
    }
    return res.status(411).json({
        message: "Error while logging in"
    })
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

//update
router.put("/", authMiddleware, async(req, res) => {
    const body = req.body;
    console.log(body);
    const {success} = updateSchema.safeParse(body);
    if(!success){
        console.log("here");
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({_id: req.userId}, req.body);
    return res.status(200).json({
        message: "Updated successfully"
    })
})

//get one
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router

/*  1. Create a ZOD Schema
    2. on signup endpoint, make sure schema is valid
    3. check if existing user exists, if they do exist, return error
    4. create a new user, get the ID, create a token, return response
*/