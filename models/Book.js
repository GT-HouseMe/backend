const mongoose = require('mongoose');
const User = require('./User.js');

// An example model for reference (does not have anything to do with this project)
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Book', bookSchema);