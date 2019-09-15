const User = require('../../models/user');
const { dbErrorHandler } = require('../../util');

exports.signup = (req, res) => {  
    const userInput = {};
    for (const key in req.body) {
        if (key === 'hashed_password') {
            continue;
        }
        userInput[key] = req.body[key];
    }
    const toSave = new User(userInput);
    toSave.save(
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: { 
                        message: dbErrorHandler(err),
                        sender: 'db',
                        data: err,
                    },
                });
            }
            if (user) {
                user.hashed_password = undefined;
                user.salt = undefined;
                return res.json({
                    success: {
                        message: 'Sign up success',
                        sender: 'server',
                        user
                    }
                })
            }
        }
    );
}