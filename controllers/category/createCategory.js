const Category = require('./../../models/category');
const { dbErrorHandler } = require('../../util');

exports.createCategory = (req, res) => {
    const newCategory = new Category(req.body);
    newCategory.save((err, newCat)=>{
        if (err) {
            return res.status(400).json({
                error: { 
                    message: dbErrorHandler(err),
                    sender: 'db',
                    data: err,
                },
            })
        }
        return res.json({
            success: {
                message: 'Category saved',
                sender: 'db',
                category: newCat,
            }
        })
    })
}