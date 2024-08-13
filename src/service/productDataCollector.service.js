// const fileCollector = require("../models/filecollector.model");
const productDataCollector = require('../models/productDataCollector.model')

const saveFile = async ({
  imgUrl,
  productName,
  category,
  price,
  description,
  userId
}) => {
  const createdDate = new Date();
  return await productDataCollector.create({
  imgUrl,
  productName,
  category,
  price,
  description,
  userId,
  createdDate
  });
};


module.exports = {
  saveFile
};
