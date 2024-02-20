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
        },
        // listing:  {
        //     type: mongoose.Types.ObjectId,
        //     ref: Listing
        // },
        // internship: {
        //     type: mongoose.Types.ObjectId,
        //     ref: Internship
        // }
        /*conversations: {
            type: [mongoose.Types.ObjectId],
            ref: Conversation
        }*/
        // not 100% sure how to do this
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema);