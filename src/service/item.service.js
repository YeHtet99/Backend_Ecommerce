const { ObjectId } = require("mongodb");
const Item = require("../models/item.model");
const createItem = async (item) => {  
    let createdItem = await Item.create(item);
    return createdItem;
  };
  const getItem = async (id)=>{
    console.log("getItem",id)
    // const data=await Item.find().lean();
    // data.map((v)=>{
    //   if(v.ownerId == item.ownerId  && v.id == item.id){
        
    //   }
    // })
    const data=await Item.find({ownerId:id})
    return data
  }
module.exports={
    createItem,getItem
}