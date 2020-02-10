var express = require('express');
var router = express.Router();

/* GET users listing. */
let getCatalog = require('../Controllers/GetCatalog');
let getProduct = require('../Controllers/GetProduct');
let reserveProducts = require('../Controllers/ReserveProducts');
router.post('/products/catalog/', getCatalog.GetCatalog);
router.post('/products/product/', getProduct.GetProduct);
router.post('/products/reserve/', reserveProducts.ReserveProducts);

module.exports = router;