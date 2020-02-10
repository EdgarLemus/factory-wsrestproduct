let SecurityService = require('../services/Security_Service');

exports.GetVerifyJwtToken = function (token, id, cb) {

    let requestVerifyJwtToken = {
        "requestHeader": {
            "token": token
        },
        "requestPayload": {
            "Id": id
        }
    };

    SecurityService.VerifyJwtToken(requestVerifyJwtToken, function (error, responseVerifyJwtToken) {
        cb(error, responseVerifyJwtToken);
    });

};