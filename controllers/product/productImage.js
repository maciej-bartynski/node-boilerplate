exports.productImage = (req, res, next) => {
    const product = req.product;
    if (!product) {
        return res.status(400).json({
            error: {
                message: 'Product is not attached to request',
                sender: "server"
            }
        })
    }

    const photo = product.photo ? product.photo.data : null ;
    const type = product.photo ? product.photo.contentType : null ;

    if (!type) {
        return res.status(400).json({
            error: {
                message: 'Photo not found',
                sender: 'server',
                data: product
            }
        })
    }

    res.set('Content-Type', type);
    return res.send(photo)
}