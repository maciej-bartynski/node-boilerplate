const Product = require('../../models/product');
const { dbErrorHandler } = require('../../util');

/**
 * Example params:
 * ?query=sold&order='asc'&limit=3
 */

exports.productByQuery = (req, res) => {
    const query = req.query.query ? req.query.query : '_id';
    const order = req.query.order ? req.query.order : 'desc';
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    Product
        .find()
        .select("-photo")
        .populate("category")
        .sort([[query, order]])
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