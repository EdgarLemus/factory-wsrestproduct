let productsAvalService = require('../services/ProductsAval_Service');

exports.GetBasicModel = function (inventory, cb) {

    let modelProducts = {
        "products": []
    };

    var index = 0;
    var limit = Object.keys(inventory).length
    if( limit > 0){        
        for (var attributename in inventory) {
            modelProducts.products.push(
                {
                    "id": inventory[attributename],
                    "name": "",
                    "images": [],
                    "oldPrice": null,
                    "newPrice": null,
                    "discount": null,
                    "ratingsCount": null,
                    "ratingsValue": null,
                    "description": "",
                    "availibilityCount": null,
                    "cartCount": null,
                    "comments": [],
                    "color": [],
                    "size": [],
                    "weight": null,
                    "categoryId": null
                }
            );
            index++;
        }
        index = 0;
        productsAvalService.GetProduct(modelProducts, index, limit, function (error, modelProducts) { 
            cb(error, modelProducts);                
        });
    }
     
}
