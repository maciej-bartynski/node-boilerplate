exports.protected = (req, res) => {
    res.json({
        Success: {
            message: 'This is temporary protected page. Your profile below.',
            sender: 'server',
            user: req.profile,
        }
    })
}