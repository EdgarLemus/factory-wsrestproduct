/* eslint-disable no-undef, no-console */
/** Import the dependencies for testing **/
const chai = require('chai');
const chaiHttp = require('chai-http');
let app = null;


/** Configure chai **/
chai.use(chaiHttp);
chai.should();

describe("Routing express - state services (UP)", () => {

    /** Exec before of run tests of the describe **/
    before(done => {
        try {
            // eslint-disable-next-line global-require
            app = require('../app.js');
            console.info('--> Successfully in prepare service - app.js \n');
            done();
        } catch (error) {
            console.error('--> Error in prepare service - app.js');
            process.exit(1);
        }
    });
    it("/POST - /products/catalog/", done => {
        try {
            chai.request(app).post('/api/products/catalog/').set('content-type', 'application/json').send({}).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service Get Catalog Data ' + error);
            process.exit(0);
        }
    });
    it("/POST - /products/catalog/", done => {
        var body = {
            "requestHeader": {
                "session": 0,
                "channel": 1
            },
            "requestPayload": {
                "All": true,
                "CountProduct": 0,
                "Availability": true,
                "NameCategory": "ACCESORIOS",
                "InitialRangePrice": 0,
                "FinalRangeProce": 0
            }
        };
        try {
            chai.request(app).post('/api/products/catalog/').set('content-type', 'application/json').send(body).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service Get Catalog Data - Token Expired ' + error);
            process.exit(0);
        }
    });   
    it("/POST - /products/product/", done => {
        try {
            chai.request(app).post('/api/products/product/').set('content-type', 'application/json').send({}).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service Get Detail Product ' + error);
            process.exit(0);
        }
    });
    it("/POST - /products/product/", done => {
        var body = {
            "requestHeader": {
                "session": 0,
                "channel": 1
            },
            "requestPayload": {
                "id": "1"
            }
        };
        try {
            chai.request(app).post('/api/products/product/').set('content-type', 'application/json').send(body).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service Get Detail Product - Token Expired ' + error);
            process.exit(0);
        }
    });
    it("/POST - /products/reserve/", done => {
        try {
            chai.request(app).post('/api/products/reserve/').set('content-type', 'application/json').send({}).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service Reserve Products ' + error);
            process.exit(0);
        }
    });
    it("/POST - /products/reserve/", done => {
        var body = {
            "requestHeader": {
                "session": 0,
                "channel": 1
            },
            "requestPayload": {
                "products": [
                    {
                        "id": "1",
                        "name": "huawei",
                        "quantity": "5",
                        "availibilityCount": false
                    },
                    {
                        "id": "5",
                        "name": "iPhone",
                        "quantity": "4",
                        "availibilityCount": true
                    }
                ]
            }
        };
        try {
            chai.request(app).post('/api/products/reserve/').set('content-type', 'application/json').send(body).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service Reserve Products - Token Expired ' + error);
            process.exit(0);
        }
    });

});