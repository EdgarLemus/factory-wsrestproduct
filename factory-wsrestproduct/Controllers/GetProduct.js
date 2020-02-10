let auditService = require('../services/Audit_Service');
let getProductManager = require('../managers/GetProduct_Manager');
let getSecurityManager = require('../managers/Security_Manager');
let mongoDB = require('../database/MongoDB');
let cache = require('memory-cache');

exports.GetProduct = function (req, res) {

    let response = {
        "responseHeader": {
            "responseInfo": {
                "system": "eCommerce_Catalog_Service",
                "responseDate": new Date().toISOString()
            },
            "status": {
                "code": "200",
                "description": "Success"
            }
        },
        "responsePayload": {
            "result": false,
            "product": ""
        }
    };

    try {
        console.log(req.body)
        var ObjectId = require('mongodb').ObjectId;
        var o_id = new ObjectId(req.body.requestPayload.id);
        let productRequest = {
            "_id": o_id
        };
        console.log("se murio antes ")
        let token = req.header("X-Session");
        let id = req.header("X-Channel");
        let ip = req.header("X-IPAddr");
        let uuid = req.header("X-RqUID");

        if (token == undefined) {
            token = req.body.requestHeader.session;
        }
        if (id == undefined) {
            id = req.body.requestHeader.channel;
        }

        console.log(token);

        getSecurityManager.GetVerifyJwtToken(token, id, function (error, responseVerifyJwtToken) {
            if (error != null) {
                console.log("Genero error al consultar producto  - token")
                response.responseHeader.status.code = 500;
                response.responseHeader.status.description = error;
                response.responsePayload.result = false;
                res.status(500).json(response);
            } else {
                if (responseVerifyJwtToken.statusCode !== 200) {
                    console.log("Genero un status diferente a 200 al consultar producto -token")
                    response.responseHeader.status.code = responseVerifyJwtToken.statusCode;
                    response.responseHeader.status.description = responseVerifyJwtToken.body.error_description;
                    response.responsePayload.result = false;
                    res.status(responseVerifyJwtToken.statusCode).json(response);
                } else {
                    console.log("llego a la consulta", productRequest)
                    console.log(productRequest)
                    var collection = "ProductoDetalle";
                    mongoDB.GetCollectionFilter(collection, productRequest, function (error, result) {
                        console.log("Consultando un producto")
                        if (error != null) {
                            response.responseHeader.status.code = 500;
                            response.responseHeader.status.description = error;
                            response.responsePayload.result = false;
                            res.status(500).json(response);
                        } else {
                            console.log(result)
                            if (result.length > 0) {
                                product = result[0];
                                //product.ratingsValue = result[0].calificacion;
                                product.ratingsCount = (Math.floor(Math.random() * (5 - 1)) + 1);
                                //product.name = result[0].informacionAdicional;
                                //product.discount = result[0].descuento;
                                if (parseInt(result[0].descuento) > 0) {
                                    product.newPrice = parseInt(product.oldPrice) - ((parseInt(result[0].descuento) * parseInt(product.oldPrice)) / 100);
                                } else {
                                    product.newPrice = parseInt(product.oldPrice);
                                }
                                //product.categoryId = result[0].categoria;
                                collection = "Galeria";
                                response.responseHeader.status.code = 200;
                                response.responseHeader.status.description = "Transacción exitosa";
                                response.responsePayload.result = true;
                                response.responsePayload.product = product;
                                //cache.put('product' + req.body.requestPayload.id, product);
                                res.setHeader(
                                    "Access-Control-Allow-Origin", "*",
                                    "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
                                );
                                res.status(200).json(response);
                            } else {
                                response.responseHeader.status.code = 400;
                                response.responseHeader.status.description = "No habian registros";
                                response.responsePayload.result = false;
                                response.responsePayload.product = "";
                                //cache.put('product' + req.body.requestPayload.id, product);
                                res.setHeader(
                                    "Access-Control-Allow-Origin", "*",
                                    "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
                                );
                                res.status(400).json(response);
                            }
                        }
                    });
                }
            }
        });
    } catch (error) {
        response.responseHeader.status.code = 500;
        response.responseHeader.status.description = "Error: " + error;
        response.responsePayload.result = false;
        res.status(500).json(response);
    }
}