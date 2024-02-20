// Conversation between users (includes conversation id, users involved, date created, etc.)
const mongoose = require('mongoose');
const User = require('./User.js');

const conversationSchema = mongoose.Schema(
    {
        dateCreated: {
            type: Date,
            required: true,
        },
        members: [{
            type: mongoose.Types.ObjectId,
            ref: User
        }]
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Conversation', conversationSchema);