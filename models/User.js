// User using the site (includes name, email, password, description, etc.)
import { Listing } from "./Listing.js";
import { Internship } from "./Internship.js"
import { Conversation } from "./Conversation.js"
import mongoose from "mongoose";

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
        listing:  {
            type: mongoose.Types.ObjectId,
            ref: Listing
        },
        internship: {
            type: mongoose.Types.ObjectId,
            ref: Internship
        }
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

export const User = mongoose.model('User', userSchema);