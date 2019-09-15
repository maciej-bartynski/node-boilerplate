const Product = require('../../models/product');
const { dbErrorHandler } = require('../../util');

exports.productsBySearchparams = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: {
                        message: dbErrorHandler(err),
                        sender: 'db'
                    }
                });
            }

            if (!data) {
                return res.status(400).json({
                    error: {
                        message: 'Products by search criteria not found',
                        sender: 'server'
                    }
                })
            }

            return res.json({
                success: {
                    message: 'Read products by search criteria',
                    sender: 'server',
                    data: {
                        products: data,
                        size: data.length,
                    }
                }
            });
        });
};