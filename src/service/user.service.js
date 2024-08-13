const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt =require('jsonwebtoken')
const SECRET_KEY = "your_secret_key";
const {
  transporter,
  mailOptions,
  greetingMailOptions,
  expiryAccountConfirmationMail,
  forgetPasswordMail,
  requestDemo
} = require("../helper/transporter");
const createUser = async (user) => {  
    user.password = bcrypt.hashSync(user.password, 10);
    const token = jwt.sign({ id: user.username }, SECRET_KEY, { expiresIn: 86400 });
    user.token =  token
    let createdUser = await User.create(user);
    return createdUser;
  };

  const sendGreetingEmail = async (userInfo) => {
    const subject = "New account created in Shop.com!";
    const mailTexts = "You have created a new account in Shop.com platform.";
  
    transporter.sendMail(
      greetingMailOptions(userInfo, subject, mailTexts),
      (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
  };
module.exports={
    createUser,
    sendGreetingEmail
}