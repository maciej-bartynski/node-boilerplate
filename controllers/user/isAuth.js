exports.isAuth = (req, res, next) => {
    const isAuth = req.profile && req.auth;
    if (!isAuth) {
        return res.status(403).json({
            error: {
                message: 'Access denied. Signed-in user do not match requesting user.',
                sender: 'server',
            }
        })
    }
    next();
};