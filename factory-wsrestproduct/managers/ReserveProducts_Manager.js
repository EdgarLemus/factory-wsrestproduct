let idProductoNotAvailable = "4";

exports.ReserveProductManager = function (productsToReserve, cb) {
    var filter = idProductoNotAvailable;
    var indexProductNotAvailable = productsToReserve.products.findIndex(function (item, index) {
        return item.id === filter;
    });
    if(indexProductNotAvailable != -1){
        cb("Los productos " + productsToReserve.products[indexProductNotAvailable].name + " no tienen disponiblidad, por favor remover del carrito de compras.", productsToReserve);
    }else{
        cb(null, productsToReserve);
    }    
};
