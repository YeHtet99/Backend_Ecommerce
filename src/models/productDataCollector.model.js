const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

const productDataCollectorSchema = mongoose.Schema({

    imgUrl: String,
    productName:String,
    category:String,
    price:Number,
    description:String,
    originalFileName:String,
    displaySize:String,
    weights:String,
    chipSet:String,
    cpu:String,
    gpu:String,
    storage:String,
    selfieCamera:String,
    mainCamera:String,
    ultraWide:String,
    telePhoto:String,
    battery:String,
    
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',    
    //     autopopulate: true
    // },
    createdDate:  { type: Date, default: Date.now },
},{ versionKey: false });

const productDataCollector = mongoose.model("productDataCollector", productDataCollectorSchema);

module.exports = productDataCollector;