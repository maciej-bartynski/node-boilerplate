const { dbErrorHandler } = require('../../util');

exports.categoryRemove = (req, res) => {
    const category = req.category;

    category.remove((err, category)=>{
        if (err) {
            res.status(400).json({
                error: { 
                    message: dbErrorHandler(err),
                    sender: 'db',
                    data: err
                },
            })
        }

        res.json({
            success: {
                message: 'Category successfully deleted',
                sender: 'db',
                category
            }
        })
        
    })
}