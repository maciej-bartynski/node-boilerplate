exports.categoryRead = (req, res) => {
    res.json({
        success: {
            message: 'Read category',
            sender: 'server',
            category: req.category
        }
    })
}