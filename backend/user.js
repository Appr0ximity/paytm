import mongoose, { mongo } from "mongoose";

const {Schema} = mongoose

const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

export const User = mongoose.model("User", userSchema)