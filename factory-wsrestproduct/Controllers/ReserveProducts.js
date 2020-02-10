let auditService = require('../services/Audit_Service');
let getSecurityManager = require('../managers/Security_Manager');
let reserveProductsManager = require('../managers/ReserveProducts_Manager');

exports.ReserveProducts = function (req, res) {    
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
    let productsToReserve = {
        "products":[]
    };
    try {     

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
                    for(var i=0; i<req.body.requestPayload.products.length; i++){
                        productsToReserve.products.push(
                            {
                                "id":req.body.requestPayload.products[i].id,
                                "name":req.body.requestPayload.products[i].name,
                                "quantity":req.body.requestPayload.products[i].quantity,
                                "availibilityCount":false
                            }
                        );
                    };
                    reserveProductsManager.ReserveProductManager(productsToReserve, function (error, product) {
                        if (error != null) {
                            response.responseHeader.status.code = 206;
                            response.responseHeader.status.description = error;
                            response.responsePayload.result = false;
                            res.status(206).json(response);
                        } else {
                            response.responseHeader.status.code = 200;
                            response.responseHeader.status.description = "Reserva exitosa";
                            response.responsePayload.result = true;
                            response.responsePayload.products = productsToReserve.products;
                            res.status(200).json(response);
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