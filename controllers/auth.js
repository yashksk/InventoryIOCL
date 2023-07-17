import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register User

export const register = async (req, res) => {
    try {
        const {
            userName,
            password
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            password: passwordHash,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET);
        delete savedUser.password;
        res.status(201).json({token, savedUser});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Login

export const login = async(req,res)=>{
    try{
        const {userName,password} = req.body;
        const user = await User.findOne({userName:userName});
        if(!user) return res.status(400).json({msg:"User does not exist"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid Credentials."});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}