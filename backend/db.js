const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://hvshekharmurthy:IB3uCeSUPKXxZ8ti@c1.ujnqw74.mongodb.net/paytm')

const {Schema} = mongoose

const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

export const User = mongoose.model("User", userSchema)