let cache = require('memory-cache');
let getCatalogManager = require('../managers/GetCatalog_Manager');
let getSecurityManager = require('../managers/Security_Manager');
let auditService = require('../services/Audit_Service');
let mongoDB = require('../database/MongoDB');

exports.GetCatalog = function (req, res) {

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
            "products": ""
        }
    };

    try {
        let requestProducts = {
            "All": req.body.requestPayload.Al1l,
            "CountProduct": req.body.requestPayload.CountProduct,
            "Availability": req.body.requestPayload.Availability,
            "NameCategory": req.body.requestPayload.NameCategory,
            "InitialRangePrice": req.body.requestPayload.InitialRangePrice,
            "FinalRangePrice": req.body.requestPayload.FinalRangePrice
        };

        let filter = {
            "categoryId": req.body.requestPayload.NameCategory
        };
        
        let token = req.header("x-session");
        let id = req.header("X-Channel");
        let ip = req.header("X-IPAddr");
        let uuid = req.header("X-RqUID");       

        if (token == undefined) {
            token = req.body.requestHeader.session;
        }
        if (id == undefined) {
            id = req.body.requestHeader.channel;
        }
        console.log(token)
        getSecurityManager.GetVerifyJwtToken(token, id, function (error, responseVerifyJwtToken) {
            if (error != null) {
                console.log("Error conectando a servicio oauth")
                response.responseHeader.status.code = 500;
                response.responseHeader.status.description = error;
                response.responsePayload.result = false;
                res.status(500).json(response);
            } else {
                if (responseVerifyJwtToken.statusCode !== 200) {
                    console.log("Error conectando a servicio oauth2")
                    response.responseHeader.status.code = responseVerifyJwtToken.statusCode;
                    response.responseHeader.status.description = responseVerifyJwtToken.body.error_description;
                    response.responsePayload.result = false;
                    res.status(responseVerifyJwtToken.statusCode).json(response);
                } else {
                    console.log("Autentico bien")
                           var collection = "ProductoDetalle";
                                console.log("Catalogo filtro", filter);
                                if (req.body.requestPayload.NameCategory == null || req.body.requestPayload.NameCategory == "TODAS LAS CATEGORIAS"){
                                    filter = {};
                                }
                                mongoDB.GetCollectionFilter(collection, filter, function (err, productoDetalle ) {
                                    if (err) {
                                        console.log("Error conectando a mongo")
                                        response.responseHeader.status.code = 500;
                                        response.responseHeader.status.description = err;
                                        response.responsePayload.result = false;
                                        res.status(500).json(response);
                                    } else {
                                        console.log(productoDetalle);
                                        if (productoDetalle && productoDetalle.length){
                                        response.responseHeader.status.code = 200;
                                        response.responseHeader.status.description = "Transacción exitosa";
                                        response.responsePayload.result = true;
                                        response.responsePayload.products = productoDetalle;
                                      
                                        res.setHeader(
                                            "Access-Control-Allow-Origin", "*",
                                            "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
                                        );
                                        res.status(200).json(response);
                                    } else {
                                        response.responseHeader.status.code = 400;
                                        response.responseHeader.status.description = "No se encontraron resultados de catalogos";
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