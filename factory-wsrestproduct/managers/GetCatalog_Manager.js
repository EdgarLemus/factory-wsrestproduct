let productsAvalService = require('../services/ProductsAval_Service');

exports.GetCatalogModel = function(requestProducts, cb){
    productsAvalService.GetInventory(requestProducts, function (error, modelProducts) { 
        cb(error, modelProducts);                         
    });    
}
 