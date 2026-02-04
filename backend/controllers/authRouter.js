import express from 'express';
import userModel from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from'dotenv';
const router = express.Router();
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
router.post('/register',async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const hashedPasword = await bcrypt.hash(password,10);
    const existingUser = await userModel.findOne({email:email});
    if(existingUser){
        return res.status(400).json({
            message:"user already exists"
        })
    }
    const newUser = await userModel.create({email:email,password:hashedPasword});
    const token = jwt.sign({id:newUser._id},JWT_SECRET,{expiresIn:"7d"});
    res.status(201).json({
        message:"user registered successfully",
        token:token
    });

}) ;
router.post('/login',async (req,res) => {
    const {email,password} = req.body;
    const existingUser = await userModel.findOne({email:email});
    if(!existingUser){
        return res.status(400).json({
            message:"Invalid credentials"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,existingUser.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalide credentials"
        })
    }
    const token  = jwt.sign({id:existingUser._id},JWT_SECRET,{expiresIn:"7d"});
    res.status(200).json({
        message:"login successful",
        token:token
    })

})
export default router;