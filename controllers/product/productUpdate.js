const { dbErrorHandler } = require('../../util');
const _ = require('lodash');
const { formParser } = require('./../../util');

exports.productUpdate = async (req, res) => {
    const parsed = await formParser(req);

    if (parsed.error) {
        return res.status(400).json({
            error: parsed.error
        })
    }

    const formData = parsed.formData;
    const product = req.product;
    _.extend(product, formData)

    product.save((err, prod) => {
        if (err) {
            return res.status(400).json({
                error: {
                    message: dbErrorHandler(err),
                    sender: 'db',
                    data: err,
                },
                productParser: parsed
            })
        }

        return res.json({
            success: {
                message: 'Product saved',
                sender: 'server',
                data: {
                    product: prod,
                    productParser: parsed,
                }
            }
        })
    })
}