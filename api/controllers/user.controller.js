const express = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const app = express();

const userController = {
    test: (req, res) => {
        res.json({ message: "User controller is working" });
    },
    register: async (req,res)=>{
       //find if req.body is empty or not?
       if(!req?.body){
        res.status(400).json({message:"Requset body is Required...!!!"})
       }

       //Check if all fields are present
       const {name,email,password} = req?.body;
       if(!name || !email || !password) {
        res.status(400).json({message:"All fields is required"})
       }

       
       try {
        
        // cheack if user already exist (email cheack)
        const isExistUser = await userModel.findOne({email})

        if(isExistUser){
            return res.status(400).json({message:"user is aleady exist...!!!"})
        }

        try {
            const hashPassword = await bcrypt.hash(password,5)
            await userModel.create({...req.body,password:hashPassword})
            res.status(200).json({message:"user register successfully"})
        } catch (error) {
            return res.status(400).json({message:error.message || "error hashing password"})
        }

       
       } catch (error) {
          console.log("Error during registration...!!!",error);
          
          res.status(400).json({message:"internal server error...!!!" || error.message})
       }
       
    },
    signin: async(req,res)=>{
        //cheack if req.body is exist
        if(!req?.body){
            res.status(400).json({message:"Request body is Required...!!!"});
        }

        //Destructuring and validate Required feilds(email,password)
        if(!req.body.email || !req.body.password){
            return res.status(400).json({message:"email & password are required...!!!"})
        }   

        try {
            //find user by email
            const isExistUser = await userModel.findOne({email:req.body.email});
            if(!isExistUser){
                res.status(400).json({message:"User doesn't exist"})
            }

            //match password by bcrypt.compare
            const isMatchPassword = await bcrypt.compare(
                req.body.password,
                isExistUser.password
            )
            if(!isMatchPassword){
                res.status(400).json({message:"Invalid password"})
            }

            const { password, ...rest } = isExistUser._doc;
            //Generate JWT token

            try {
                const  token = jwt.sign({...rest},process.env.JWT_SECRET);
                res.cookie("Access_Token",token).status(200).json({message:"Login successfully",user:rest,token:token})
            } catch (error) {
                return res.status(400).json({message:"Error generating token"})
            }


            
        } catch (error) {
            console.log("error doing login");
            res.status(400).json({message:"Internal server error"})
        }
    }
    
    
}


module.exports = userController;







//  await userModel.create(req.body);
//             res.status(200).json({message:"db fetch successfully"})
//        } catch (error) {
//            res.status(400).json({message:"something was wrong",error:error.message})
            
//        }