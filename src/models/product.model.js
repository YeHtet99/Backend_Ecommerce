const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
// const { encryption, decryption } = require("../config/secure");

const productSchema = mongoose.Schema({
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
  category:{
    type:String,
    required: true
  },
  category_id:Number

},
  {
    versionKey: false,
    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
    runSettersOnQuery: true,
  });

const Product = mongoose.model("products", productSchema);
module.exports = Product;
