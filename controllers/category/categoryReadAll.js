const Category = require('./../../models/category');
const { dbErrorHandler } = require('../../util')

exports.categoryReadAll = (req, res) => {
    Category.find().exec((err, categories)=>{
        if (err){
            return res.status(400).json({
                error: {
                    message: dbErrorHandler(err),
                    sender: 'db',
                    data: err,
                }
            })
        }

        if (!categories) {
            return res.status(400).json({
                success: {
                    message: 'Categories not found',
                    sender: 'server',
                }
            })
        }

        return res.json({
            success: {
                message: 'Read all categories',
                sender: 'server',
                category: categories
            }
        })
    })
}