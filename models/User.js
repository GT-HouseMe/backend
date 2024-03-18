// User using the site (includes name, email, password, description, etc.)
const Listing = require('./Listing.js');
const Internship = require('./Internship.js')
const Conversation = require('./Conversation.js');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

var User = mongoose.model('User', userSchema);
module.exports = User;