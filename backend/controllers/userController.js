import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
const JWT_SECRET='secretKey'
const register=async(req,res)=>{
    try {
        const {email, password,name,country } = req.body;
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "User already registered, please login" });
        }
        const newUser = new userModel({ email, password,name,country})
        await newUser.save();
        res.status(201).json({ msg: "User registered successfully", user: newUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server error", error: error.message });
    
        
    }
}

const login=async(req,res)=>{


    try {
        const {email,password}=req.body
        const isUserExist=await userModel.findOne({email:email})
        if(!isUserExist){
            return res.status(400).json({msg:"user does not exit please Register"})
        }
        const matchPassword = password === isUserExist.password;
        if(!matchPassword){
            return res.status(401).json({ msg: "Invalid email or password" });
      }
    const payload={
        userId: isUserExist._id,
        email: isUserExist.email,
        name: isUserExist.name
    };  
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });


      res.status(200).json({msg:"logging successfully ",token:token})        

            
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });

    }
}

const curloginuser=(req,res)=>{
    try {
        const userData=req.user
    return res.status(200).json({data:userData})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:"error occure to fecth current user login data"})
    }    
    }
    

export default {register,login,curloginuser}