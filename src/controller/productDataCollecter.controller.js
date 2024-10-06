const { ObjectId } = require("mongodb");
const fileCollector = require("../service/productDataCollector.service");
const response = require("../config/response");
const Product =require("../models/productDataCollector.model")
const fs = require("fs");
const path =require('path')


const createProduct = async (req, res, next) => {
  try {
    const { productName,categoryName,price,description,userId,displaySize,
      weights,
      chipSet,
      cpu,
      gpu,
      storage,
      selfieCamera,
      mainCamera,
      ultraWide,
      telePhoto,
      battery}=req.body
    // const user = await getCurrentUser(req, res);
    // const general_information = JSON.parse(req.body.general_information);
    // const boundary_setting = JSON.parse(req.body.boundary_setting);
    // const allocation = JSON.parse(req.body.allocation)
    console.log("files",req.files)
    const imgUrl = req.files.file
      ? `upload/productData/${req.files.file[0].filename}`
      : `upload/productData/no-img.svg`;
  
    const newProduct = await Product.create({
      imgUrl,
      productName,
      category : categoryName,
      price,
      description,
      originalFileName:req.files.file[0].originalname,
      displaySize,
      weights,
      chipSet,
      cpu,
      gpu,
      storage,
      selfieCamera,
      mainCamera,
      ultraWide,
      telePhoto,
      battery
      // userId
    });
    const products= await Product.find({}).sort({createdDate: -1});

    if (!newProduct) {
      return res.status(400).json({ message: "Product not created" });
    } else {
      return res
        .status(201)
        .json({ message: "Product created successfully", payload: products,success:true });
    }
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};

const updateProduct = async (req,res,next)=>{
  try {
    const { productName,categoryName,price,description,userId,displaySize,
      weights,
      chipSet,
      cpu,
      gpu,
      storage,
      selfieCamera,
      mainCamera,
      ultraWide,
      telePhoto,
      battery}=req.body
      console.log("body",req.body)
    const {id} = req.params
    console.log("id",id)
    console.log("files",req.files &&
      req.files.file)
    console.log("req body",req.body)
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    

    if (
      req.files &&
      req.files.file &&
      req.files.file?.length > 0
    ) {
      
      if (fs.existsSync(existingProduct.imgUrl) && req.files.file?.length > 0) {
        fs.unlinkSync(existingProduct.imgUrl);
      }
      await Product.findOneAndUpdate(
        {_id:new ObjectId(id)},
        { $set: { imgUrl:`upload/productData/${req.files.file[0].filename}`,originalFileName:`${req.files.file[0].originalname}`} },
    { upsert: true }
      );

    } 
    await Product.findOneAndUpdate(
      {_id:new ObjectId(id)},
      { $set: { productName:productName,category:categoryName,price:price,description:description,displaySize,
        weights:weights,
        chipSet:chipSet,
        cpu:cpu,
        gpu:gpu,
        storage:storage,
        selfieCamera:selfieCamera,
        mainCamera:mainCamera,
        ultraWide:ultraWide,
        telePhoto:telePhoto,
        battery:battery} },
  { upsert: true }
    );
    const products = await Product.find({}).sort({createdDate: -1})
    return res.json({success:true,payload:products,error:null})


    // const imgUrl = req.files.file
    //   ? `upload/productData/${req.files.file[0].filename}`
    //   : `upload/productData/no-img.svg`;
  
    // const newProduct = await Product.create({
    //   imgUrl,
    //   productName,
    //   category : categoryName,
    //   price,
    //   description,
    //   originalFileName:req.files.file[0].originalname
    //   // userId
    // });
    // const products= await Product.find();

    // if (!newProduct) {
    //   return res.status(400).json({ message: "Product not created" });
    // } else {
    //   return res
    //     .status(201)
    //     .json({ message: "Product created successfully", payload: products,success:true });
    // }
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
}

const getProducts=async(req,res,next)=>{
  const result = await Product.find({}).sort({createdDate: -1});
  console.log("result of product",result)
  return res.json({success:true,payload:result,error:null})
}

const deleteProduct=async(req,res,next)=>{
  const {id} = req.params;
  const productData=await Product.findById(id)
  await Product.findOneAndDelete({_id:id})
  const deleteFile = (imgUrl) => {
    if (imgUrl && fs.existsSync(imgUrl)) {
      fs.unlinkSync(imgUrl);
    }
  };

  // Delete product-related files
  // if (product.general_information) {
    deleteFile(productData.imgUrl);
  // }
  const products = await Product.find({}).sort({createdDate: -1});
  return res.json({success:true,payload:products,error:null,message:"Product Deleted Successfully"})
}


module.exports = {
    createProduct,getProducts,deleteProduct,updateProduct
};
