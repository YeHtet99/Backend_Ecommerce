const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
// const { encryption, decryption } = require("../config/secure");

const itemSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
    // set: encryption,
    // get: decryption
  },
  imgUrl: {
    type: String, 
    required: true, 
    // set: encryption,
    // get: decryption
  },
  price: {
    type: Number, 
    required: true, 
    // set: encryption,
    // get: decryption
  },
  id: String,
  ownerId:String,
  quantity:Number
},
  {
    versionKey: false,
    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
    runSettersOnQuery: true,
  });

const Item = mongoose.model("items", itemSchema);
module.exports = Item;
