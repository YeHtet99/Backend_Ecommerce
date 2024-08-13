const response = require("../config/response");
const bcrypt = require("bcrypt");
const productService = require("../service/product.service");
const Product = require("../models/product.model");
const addProduct = async(req,res,next)=>{
    console.log("add Item",req.body)
    const {productName,price,imgUrl,category,category_id} = req.body;
    try{
        const product = new Product({
            productName: productName,
            price: Number(price),
            imgUrl: imgUrl,
            category : category,
            category_id: category_id
            
          });
          var result = []
          console.log("id===,",userId,id)
          const findData=await Product.findOne({productName:productName});
          // if(findData){
          //      await Item.findOneAndUpdate(
          //   {ownerId:userId,id:id},
          //   { $inc: { count: 1 } },
          //   { upsert: true }
          // );
          // result =await itemService.getItem(item.ownerId);
          // }else{
          //   await itemService.createItem(item);
          //   result =await itemService.getItem(item.ownerId);
          // }
          if(!findData){
            await productService.createProduct(product);
            result =await Product.findOne({productName:productName})
            console.log("result",result)
          }

  // if(result.lenght) {
  //   return res.status(200).json({
  //     status: "Success",
  //     payload: result
  //   })
  // }

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
const updateProduct = async(req,res,next)=>{
    console.log("add Item",req.body)
    const {productName,price,imgUrl,id,userId} = req.body;
    try{
        const item = new Item({
            productName: productName,
            price: Number(price),
            imgUrl: imgUrl,
            id:id,
            ownerId:userId,
            quantity:1
            
          });
          var result = []
          console.log("id===,",userId,id)
          const findData=await Item.findOne({ownerId:userId,id:id});
          // if(findData){
          //      await Item.findOneAndUpdate(
          //   {ownerId:userId,id:id},
          //   { $inc: { count: 1 } },
          //   { upsert: true }
          // );
          // result =await itemService.getItem(item.ownerId);
          // }else{
          //   await itemService.createItem(item);
          //   result =await itemService.getItem(item.ownerId);
          // }
          if(!findData){
            await itemService.createItem(item);
            result =await Item.findOne({ownerId:userId,id:id})
            console.log("result",result)
          }

  // if(result.lenght) {
  //   return res.status(200).json({
  //     status: "Success",
  //     payload: result
  //   })
  // }

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
const getProducts =async (req,res,next)=>{
  console.log("body===>",req.body)
  try{
    const result =await productService.getProduct();
  return res.json(
    response({
      success:true,
      payload:result
    })
  )
  }catch(err){
    next(err)
  }
  
  
}
const deleteProduct =async(req,res,next)=>{
  const {id,ownerId}=req.body;
  try{
    console.log("delete item",id,ownerId)
    await Item.findOneAndDelete({id:id,ownerId:ownerId})
    const result =await itemService.getItem(ownerId);
    return res.json(
      response({
        success:true,
        payload:result
      })
    )
  }catch(err){
    next(err)
  }
}
module.exports={
    addProduct,getProducts,deleteProduct,updateProduct
}