const model = require('mongoose').model;
const Schema = require('mongoose').Schema;
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: 32,
        },
        hashed_password: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            trim: true,
        },
        salt: String,
        role: {
            type: Number,
            default: 0,
        },
        history: {
            type: Array,
            default: []
        }
    }, {
        timestamps: true,
    }
);

// virtual fields
userSchema.virtual('password')
    .set(
        function (password) {
            this._password = password;
            this.salt = uuidv1();
            this.hashed_password = this.encryptPassword(password);
        }
    ).get(
        function () {
            return this._password;
        }
    )

userSchema.methods = {
    authenticate: function(userInput){
        return this.encryptPassword(userInput) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return '';

        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }
        catch (e) {
            return '';
        }
    }
}

module.exports = model('User', userSchema);