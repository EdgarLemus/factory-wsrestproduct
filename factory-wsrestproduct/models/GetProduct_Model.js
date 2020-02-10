
exports.GetProductModel = function (productRequest, cb) {    
    let product = {
        "id": productRequest.id,
        "name": "",
        "images": [],
        "oldPrice": null,
        "newPrice": null,
        "discount": null,
        "ratingsCount": null,
        "ratingsValue": null,
        "description": "",
        "detailDescription":"",
        "additionalInformation":"",
        "availibilityCount": null,
        "cartCount": null,
        "comments": [],
        "color": [],
        "size": [],
        "weight": null,
        "categoryId": null
    };
    cb(null, product);
}