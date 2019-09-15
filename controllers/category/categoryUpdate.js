const { dbErrorHandler } = require('../../util');
const _ = require('lodash');

exports.categoryUpdate = (req, res) => {
   const category = req.category;
    _.extend(category, req.body);

    category.save((err, categ) => {
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
                sender: 'server',
                category: categ,
            }
        })
    })
}