const Product = require('../../models/product');
const { dbErrorHandler } = require('../../util');
const { formParser } = require('./../../util');

exports.productCreate = async (req, res) => {

    const parsed = await formParser(req)
    if (parsed.error) {
        return res.status(400).json({
            error: parsed.error
        })
    }

    const formData = parsed.formData;
    const newProduct = new Product(formData);

    newProduct.save((err, newProd) => {
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
                    product: newProd,
                    productParser: parsed,
                }
            }
        })
    })
}