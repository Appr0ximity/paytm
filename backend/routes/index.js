import { userRouter } from "./user.js"
import express from "express"

const app = express()

export const rootRouter = express.Router()

rootRouter.use("/user", userRouter)