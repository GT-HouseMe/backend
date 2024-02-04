import { User } from "./User.js";
import mongoose from "mongoose";

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
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: User,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

export const Book = mongoose.model('Book', bookSchema);