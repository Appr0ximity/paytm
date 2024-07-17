import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const {Schema} = mongoose

const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

export const User = mongoose.model("User", userSchema)