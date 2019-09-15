const Product = require('../../models/product');
const { dbErrorHandler } = require('../../util');

/**
 * Example params:
 * ?query=sold&order='asc'&limit=3
 */

exports.productRelated = (req, res) => {

    const productId = req.product ? req.product._id : null;
    
    if (!productId){
        return res.status(400).json({
            error: {
                message: 'Product id not found in request',
                sender: 'server'
            }
        })
    }

    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    Product
        .find({ _id: { $ne: productId }, category: req.product.category })
        .select("-photo")
        .populate("category", "_id name")
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: {
                        message: dbErrorHandler(err),
                        sender: 'db',
                        data: err,
                    }
                })
            }
            if (!products) {
                return res.status(400).json({
                    error: {
                        message: 'Products not found',
                        sender: 'server',
                    }
                })
            }

            res.json({
                success: {
                    message: 'Read product\'s query list',
                    sender: 'server',
                    products,
                }
            });
        })
}