import { userRouter } from "./user"

const express = require("express")

const app = express()

export const rootRouter = express.Router()

rootRouter.use("/user", userRouter)