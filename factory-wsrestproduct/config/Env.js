'use strict';

const env = {
    securityHost: process.env.POC_SERVICE_SECURITY_HOST || "wsrestoauth",
    securityPort: process.env.POC_SERVICE_SECURITY_PORT || "13010",
    inventoryHost: process.env.POC_SERVICE_INVENTORY_HOST || "localhost",
    inventoryPort: process.env.POC_SERVICE_INVENTORY_PORT || "3020",
    endpointOauth2: process.env.POC_END_POINT_OAUTH || "/oauth/token",
    endpointOauth2Check: process.env.POC_END_POINT_OAUTH_CHECK || "/oauth/check_token",
    oauth2User: process.env.POC_OAUTH_USER || "cristian",
    oauth2Pass: process.env.POC_OAUTH_PASS || "pin",
    auditHost: process.env.POC_SERVICE_AUDIT_HOST || "a9b0d2398538011e9a81b0666116d3a5-1531753782.us-east-2.elb.amazonaws.com",
    auditPort: process.env.POC_SERVICE_AUDIT_PORT || "18082",
    mongoDBHost: process.env.POC_MONGO_HOST || "mongo",
    mongoDBPort: process.env.POC_MONGO_PORT || "27017",
    mongoDBUser: process.env.POC_MONGO_USER || "",
    mongoDBPass: process.env.POC_MONGO_PASS || "",
    mongoDB: process.env.POC_MONGO_DB ||  "sophos_store"
};

module.exports = env;