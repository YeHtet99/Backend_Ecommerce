// const express = require("express");
const express = require("express");
const routes = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const itemController = require('../controller/item.controller');
const productController =require('../controller/product.controller');
const { authenticationMiddleware } = require("./middleware");
// const productDataUpload = require("../util/productDataUpload");
const productDataUpload = require('../util/productDataUpload')
const productDataCollector = require('../controller/productDataCollecter.controller')

// routes.use(authenticationMiddleware);
routes.post('/signup',authController.signup)
routes.post('/login',authController.login)
routes.post('/profile',authController.profile)
routes.post('/change_password',authController.changePassword)
routes.post('/add_item',itemController.addItem)

routes.post('/get_item',itemController.getItem)

routes.post('/update-item-quantity',itemController.updateItemQuantity)
routes.post('/delete_item',itemController.deleteItem)

routes.get('/get_products',productController.getProducts)
routes.post('/add_product',productController.addProduct)
routes.post('/update_product',productController.updateProduct)
routes.post('/delete_product',productController.deleteProduct)

routes.post(
    "/create-product",
    productDataUpload.fields([{
       name: 'file', maxCount: 1
    }]),
    productDataCollector.createProduct
  );
  routes.put(
    "/update-product/:id",
    productDataUpload.fields([{
       name: 'file', maxCount: 1
    }]),
    productDataCollector.updateProduct
  );

routes.get('/products',productDataCollector.getProducts)
routes.delete('/product-delete/:id',productDataCollector.deleteProduct)


module.exports = routes;