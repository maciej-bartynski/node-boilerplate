exports.isAdmin = (req, res, next) => {
    if (!req.profile.role) {
        return res.status(403).json({
            error: {
                message: 'Access denied - admin resources',
                sender: 'server'
            }
        })
    }
    next();
};