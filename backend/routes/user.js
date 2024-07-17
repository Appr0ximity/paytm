import { JWT_SECRET } from "../config"
const jwt = require("jsonwebtoken")
const express = require("express")
const zod = require("zod")
const {User} = require("../db")

const app = express()

const userSignup = zod.object({
    username: zod.email({
        message: "Invalid email"
    }),
    firstName: zod.string(),
    lastName : zod.string(),
    password: zod.string()
})

export const userRouter = express.Router()

userRouter.post("/signup", async (req, res)=>{
    const {username, firstname, lastname, password} = req.body
    const credentials = {
        username: username,
        firstName: firstname,
        lastname: lastname,
        password: password
    }
    const credVerification = userSignup.safeParse(credentials)
    if(!credVerification.success){
        credVerification.error.issues
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    else{
        const existingUser = User.findOne({
            username: credentials.username
        })
        if(existingUser){
            return res.status(411).json({
                message:"Existing User!!"
            })
        }
        const user = await User.create(credentials)
        const userID = user._id

        const token = jwt.sign({
            userID
        }, JWT_SECRET)

        return res.json({
            message:"User created successfully",
            token: token
        })
    }
})