const Category = require('./../../models/category');
const { dbErrorHandler } = require('../../util');

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, categ)=>{
        if (err) {
            return res.status(400).json({
                error: {
                    message: dbErrorHandler(err),
                    sender: 'db',
                    data: err,
                }
            })
        }

        if (!categ) {
            return res.status(400).json({
                error: {
                    message: 'Category does not exist',
                    sender: 'server',
                }
            })
        }

        req.category = categ;
        next();
    })
}