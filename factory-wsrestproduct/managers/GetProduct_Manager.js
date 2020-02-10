let productsAvalService = require('../services/ProductsAval_Service');
let getProductModel = require('../models/GetProduct_Model');

exports.GetProductManager = function (productRequest, cb) {
  getProductModel.GetProductModel(productRequest, function (error, product) {
    if (error != null) {
      cb(error, null);
    } else {
      productsAvalService.GetProductDetail(product, function (error, product) {
        if(error != null){
          cb(error, null); 
        }else{
          cb(null, product);  
        }        
      });
    }
  });

}
