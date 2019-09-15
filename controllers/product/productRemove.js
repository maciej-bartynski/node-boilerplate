const { dbErrorHandler } = require('../../util');

exports.productRemove = (req, res) => {
    const product = req.product;

    product.remove((err, prod)=>{
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
                message: 'Product successfully deleted',
                sender: 'db',
                product: prod
            }
        })
        
    })
}