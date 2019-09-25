const User = require('../../models/user');
const { dbErrorHandler } = require('../../util');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: {
                    message: dbErrorHandler(err),
                    sender: 'db',
                    data: err
                }
            })
        }

        if (!user) {
            return res.status(400).json({
                error: {
                    message: 'User do not exits',
                    sender: 'server'
                }
            })
        }

        user.salt = undefined;
        user.hashed_password = undefined;

        req.profile = user;
        console.log(user)
        next();
    });
}