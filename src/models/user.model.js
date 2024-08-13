const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
// const { encryption, decryption } = require("../config/secure");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    // set: encryption,
    // get: decryption
  },
  email: {
    type: String, 
    unique: true, 
    required: true, 
    // set: encryption,
    // get: decryption
  },
  imgUrl:String,
  password: String,
  token : String,
  userType : String
},
  {
    versionKey: false,
    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
    runSettersOnQuery: true,
  });

const User = mongoose.model("users", userSchema);
module.exports = User;
