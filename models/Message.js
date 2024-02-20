// A message in a conversation (includes sent by, timestamp, id of conversation it belongs to, message contents, etc.)
const mongoose = require('mongoose');
const User = require('./User.js');
const Conversation = require('./Conversation.js');

const messageSchema = mongoose.Schema(
    {
        sentBy: {
            type: mongoose.Types.ObjectId,
            ref: User,
            required: true,
        },
        conversation: {
            type: mongoose.Types.ObjectId,
            ref: Conversation,
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Message', messageSchema);