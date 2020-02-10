let Request = require("request");
let config = require('../config/Env');

exports.VerifyJwtToken = function (requestVerifyJwtToken, cb) {
    let url =  config.securityHost + ":" +config.securityPort + config.endpointOauth2Check + "?token="+requestVerifyJwtToken.requestHeader.token
    console.log(url)
    let auth = "Basic " + Buffer.from(config.oauth2User + ':' + config.oauth2Pass).toString("base64");
    Request.get({
        url: url,
        headers: {
            "Authorization": auth
        }
    }, (error, response) => {
        if (error) {
            cb(error, null);
        }else{
            cb(null, response);
        }        
    });
};