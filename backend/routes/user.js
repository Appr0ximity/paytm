import { JWT_SECRET } from "../config.js"
import jwt from "jsonwebtoken"
import express from "express"
import zod from "zod"
import { Account, User } from "../db.js"
import { authMiddleware } from "../middleware.js"

const app = express()

const userEdit = zod.object({
    password: zod.string().min(8),
    firstName: zod.string(),
    lastName: zod.string()
})

const userSignup = zod.object({
    username: zod.string().email("Invalid email"),
    firstName: zod.string(),
    lastName : zod.string(),
    password: zod.string()
})

const userSignin = zod.object({
    username: zod.string().email({
        message:"Invalid email"
    }),
    password: zod.string()
})

export const userRouter = express.Router()

userRouter.put("/", authMiddleware, async (req, res)=>{
    const {password, firstname, lastname} = req.body
    const credentials = {
        password: password,
        firstName: firstname,
        lastName: lastname
    }

    const {success} = userEdit.safeParse(credentials)

    if(!success){
        return res.status(403).json({
            message:"Invalid input format"
        })
    }
    try {
        await User.updateOne({_id:req.userId}, credentials)
        res.status(200).json({
            message:"Updated successfully"
        })
    } catch (error) {
        return res.error(error)
    }
})

userRouter.post("/signup", async (req, res)=>{
    const {username, firstname, lastname, password} = req.body
    const credentials = {
        username: username,
        firstName: firstname,
        lastName: lastname,
        password: password
    }
    const {success} = userSignup.safeParse(credentials)
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    try {
        const existingUser = await User.findOne({
            username: credentials.username
        })
        if(existingUser){
            return res.status(411).json({
                message:"Existing User!!"
            })
        }
        const user = await User.create(credentials)
        const userID = user._id
        await Account.create({
            userId: userID,
            balance: 1 + Math.random() * 10000
        })
        const token = jwt.sign({
            userID
        }, JWT_SECRET)
        return res.status(200).json({
            message:"User created successfully",
            token: token
        })
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
    
})

userRouter.post("/signin", async (req,res)=>{
    const {username, password} = req.body
    const credentials = {
        username: username,
        password: password
    }

    const {success} = userSignin.safeParse(credentials)

    if(!success){
        return res.status(411).json({
            message:"Invalid input"
        })
    }


    const userExists = await User.findOne({
        username: username
    })
    if(!userExists){
        return res.status(411).json({
            message:"User doesn't exist! Signup to create your account!"
        })
    }
    const userCorrect = await User.findOne(credentials)

    if(!userCorrect){
        return res.status(411).json({
            message:"Incorrect Credentials!"
        })
    }

    const token = jwt.sign({
        userID: userCorrect._id
    }, JWT_SECRET)

    res.status(200).json({
        message:"Welcome!",
        token: token
    })
})

userRouter.get("/bulk", async (req,res)=>{
    const filter = req.query.filter || ""
    const filteredUsers = await User.find({
        $or:[{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.status(200).json({
        user: filteredUsers.map(user=>({
            username : user.username,
            firstName : user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})