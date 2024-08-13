const { ObjectId } = require("mongodb");
const Product = require("../models/product.model");
const createProduct = async (product) => {  
    let createdProduct = await Product.create(product);
    return createdProduct;
  };
  const getProduct = async ()=>{
    // const data=await Item.find().lean();
    // data.map((v)=>{
    //   if(v.ownerId == item.ownerId  && v.id == item.id){
        
    //   }
    // })
    const data=await Item.findAll()
    return data
  }
module.exports={
    createProduct,getProduct
}