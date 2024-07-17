import dotenv from "dotenv"
import mongoose, { mongo } from "mongoose"

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const {Schema} = mongoose

const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})


export const Account = mongoose.model("Account", accountSchema)
export const User = mongoose.model("User", userSchema)