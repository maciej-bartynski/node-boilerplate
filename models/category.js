const model = require('mongoose').model;
const Schema = require('mongoose').Schema;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique:32
        },
    }, {
        timestamps: true,
    }
);

module.exports = model('Category', categorySchema);