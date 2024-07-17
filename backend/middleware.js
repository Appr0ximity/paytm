import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js"

export const authMiddleware = (req, res, next)=>{
    const authJWT = req.headers.authorization
    if(!authJWT || !authJWT.startsWith("Bearer ")){
        return res.status(403).json({
            message:"Wrong Authentication"
        })
    }
    const token = authJWT.split(' ')[1]
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userID
        next()
    } catch (err) {
        return res.status(403).json({
            message:"User not verified"
        })
    }
}