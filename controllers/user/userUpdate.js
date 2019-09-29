const User = require('../../models/user');
const { dbErrorHandler } = require('../../util');

exports.userUpdate = (req, res) => {
    User.findOneAndUpdate({
        _id: req.profile._id
    },{
        $set: req.body
    }, {
        new: true
    }, (err, user)=>{
        if (err){
            return res.status(400).json({
                error: {
                    sender: 'db',
                    message: dbErrorHandler(err)
                }
            })
        }
        if (!user){
            return res.status(400).json({
                error: {
                    sender: 'server',
                    message: 'User not receivd from database'
                }
            })
        }
        return res.json({
            success: {
                sender: 'db',
                message: 'Updated user',
                user
            }
        })
    })
}