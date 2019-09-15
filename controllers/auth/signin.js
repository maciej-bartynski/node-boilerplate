const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { dbErrorHandler } = require('../../util');

exports.signin =  (req, res) => {
    const { email, password } = req.body;
    
    User.findOne({ email }, (err, user)=>{

        if (err) {
            return res.status(400).json({
                error: {
                    message: dbErrorHandler(err),
                    sender: 'db',
                    data: err,
                }
            })
        }

        if (!user) {
            return res.status(400).json({
                error: {
                    message: 'Email does not match any user',
                    sender: 'server'
                }
            })
        } 

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: {
                    message: 'Password and email do not match',
                    sender: 'server'
                }
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.cookie("t", token, {
            expire: new Date() + 9999
        })

        const { _id, name, email, role } = user;
        
        return res.json({
            success: {
                message: 'Sign in success',
                sender: 'server',
                data: {
                    token, 
                    user: { 
                        _id, 
                        name, 
                        email, 
                        role,
                    },
                }
            }
        })
    })
}