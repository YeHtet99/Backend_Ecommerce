const response = require("../config/response");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const userService = require("../service/user.service");
const User = require("../models/user.model");
const path=require('path')
const fs=require('fs')
const signup = async(req,res,next)=>{
    console.log("singup")
    const {username,email,password,imgUrl,userType} = req.body
    try{
        const user = new User({
            userName: username,
            email: email,
            password: password,
            imgUrl:imgUrl,
            // token:'Admin%23123',
            userType:userType
          });
          await userService.createUser(user);
          userService.sendGreetingEmail(user);
          const data=await User.findOne({email:email})
        return res.json(
            response({
                success: true,
                payload: data,
              })
          );
    }catch(error){
        next(error)
    }
}
const login = async(req,res,next)=>{
    console.log("login")
    const {email,password} = req.body
    console.log("email and password",email,password)
    try{
        const data=await User.findOne({email:email})
        console.log("data======>",data)
        if(!data){
            return res.status(400).json({
                success:false,
                payload:null,
                error:"Email or Password does not match"
            })
        }else{
            if (!(data && bcrypt.compareSync(password, data.password))){
                return res.status(400).json({
                    success:false,
                    payload:null,
                    error:"Email or Password does not match"
                })
            }else{
                return res.json(
                    response({
                        success: true,
                        payload: data,
                      })
                  );
            } 
            
        }
        
    }catch(error){
        next(error)
    }
}
const profile = async(req,res,next)=>{
    console.log("profile",req.body)
    const {userName,email,userId,file,fileName}= req.body;
    const imageData=JSON.parse(file)
    const file_name=JSON.parse(fileName)
    const user_id=JSON.parse(userId)
    const user_name=JSON.parse(userName)
    const Email=JSON.parse(email)
    let imgUrl =null;
    try{
        if(imageData !== null){
            const uploadDirectory = path.join(__dirname,"..","upload");
                const imageBuffer = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), "base64");
                if (!fs.existsSync(uploadDirectory)) {
                    fs.mkdirSync(uploadDirectory);
                }
                var imagePath = path.join(uploadDirectory,`${file_name}`);
                fs.writeFileSync(imagePath, imageBuffer);
                imgUrl=`upload/${file_name}`
        }else{
            const parts = file_name.split("/");

            // Get the last part of the split array (which should be the file name)
            const fileName = parts[parts.length - 1];
            imgUrl=`upload/${fileName}`
        }
        
        await User.findOneAndUpdate(
              {_id:new ObjectId(user_id)},
              { $set: { email:Email,userName:user_name,imgUrl} },
          { upsert: true }
            );
        const result = await User.findOne({_id:new ObjectId(user_id)})
        return res.json(
            response({
                success: true,
                payload: result,
              })
          );
    }catch(error){
        next(error)
    }
}
const changePassword=async(req,res,next)=>{
    console.log("change password",req.body)
    const {current_password,new_password,id}=req.body;
    try {
        const data = await User.findOne({ _id: new ObjectId(id) });
    
        if (!data) {
            return res.status(400).json(
                response({
                    success:false,
                    payload:null,
                    error:"Something went wrong"
                })
              );
        }
    
        if (!(data && bcrypt.compareSync(current_password, data.password)))
        return res.status(400).json(
            response({
                success:false,
                payload:null,
                error:"Password doesn't match"
            })
          );
        else {
          await User.updateOne(
            { _id: new ObjectId(id) },
            {
              $set: {
                password:bcrypt.hashSync(new_password, 10)
              }
            }
          );
          return res.json(
            response({
                success:true,
                payload:"Updated Password Successfully",
            })
          );
        }
      } catch (e) {
        throw e;
      }
}
const logout =async(req,res,next)=>{
    try{

    }catch(err){

    }
}
module.exports={
    signup,login,logout,profile,changePassword
    
}