const response = require("../config/response");
const bcrypt = require("bcrypt");
const itemService = require("../service/item.service");
const Item = require("../models/item.model");
const addItem = async(req,res,next)=>{
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
          
          const findData=await Item.findOne({ownerId:userId,id:id});
          console.log("find data===,",findData)
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
            result =await Item.find({ownerId:userId})
            console.log("result",result)
          }else{
            await Item.findOneAndUpdate(
                {ownerId:userId,id:id},
                { $inc: { quantity: 1 } },
                { upsert: true }
              );
              result =await Item.find({ownerId:userId})
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
const getItem =async (req,res,next)=>{
  console.log("body===>",req.body)
  try{
    const {ownerId}=req.body;
    const result =await itemService.getItem(ownerId);
    console.log("get item result",result)
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
const deleteItem =async(req,res,next)=>{
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
const updateItemQuantity = async (req,res,next)=>{
  console.log("body",req.body)
  const data=req.body
  try{
    for (let d of data) {
      console.log("d",d)
      const findOne =await Item.findOne({ _id: new Object(d._id) })
      const result= await Item.findOneAndUpdate(
        { _id: new Object(d._id) },
        { $set: { quantity : d.quantity} },
        { upsert: true }
      );
      console.log("result",result)
      console.log("findone",findOne)
    }
    let updateData = [];
    if(data?.length > 0){
      updateData = await Item.find({ownerId:data[0].ownerId})
    }
    // const result =await itemService.getItem(ownerId);
    return res.json(
      response({
        success:true,
        payload:updateData
      })
    )
  }catch(err){
    next(err)
  }
}
module.exports={
    addItem,getItem,deleteItem,updateItemQuantity
}