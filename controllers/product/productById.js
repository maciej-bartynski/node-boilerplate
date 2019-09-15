const Product = require('../../models/product');
const { dbErrorHandler } = require('../../util');

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product)=>{
        if (err) {
            res.status(400).json({
                error: {
                    message: dbErrorHandler(err),
                    sender: 'db',
                    data: err,
                }
            })
        }
        if (!product) {
            return res.status(400).json({
                error: {
                    message: 'Product does not exist',
                    sender: 'server',
                }
            })
        }
        
        req.product = product;
        next();
    });
}