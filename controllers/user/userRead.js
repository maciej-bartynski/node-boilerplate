exports.userRead = (req, res) => {
    res.json({
        success: {
            message: 'Read user data',
            sender: 'server',
            user: req.profile
        }
    })
}
