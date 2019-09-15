const expressJwt = require('express-jwt');

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})

exports.requireSigninError = (err, req, res, next) => {
    if (err) {
        return res.status(401).json({
            error: {
                message: err.message,
                sender: 'express-jwt core',
                data: err,
            }
        })
    }
    next()
}