const Product = require('../../models/product');
const { dbErrorHandler } = require('../../util');

exports.productCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories)=>{
        if (err){
            return res.status(400).json({
                error: {
                    message: dbErrorHandler(err),
                    sender: 'db',
                }
            })
        }

        if (!categories){
            return res.status(400).json({
                error: {
                    message: 'Categories not found',
                    sender: 'server',
                }
            })
        }

        res.json({
            success: {
                message: 'Read categories data',
                sender: 'server',
                categories: categories
            }
        })
        
    })
}
