// User apartment listing (includes location, rent, start date, end datae, description)
import mongoose from "mongoose";

const listingSchema = mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      ref: User,
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Listing = mongoose.model("Listing", listingSchema);
