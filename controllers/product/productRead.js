exports.productRead = (req, res) => {
    product.photo = undefined;
    res.json({
        success: {
            message: 'Read product data',
            sender: 'server',
            product: req.product
        }
    })
}
