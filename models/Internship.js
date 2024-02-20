// User internship (including company, location, start date, end date, description)
import mongoose from "mongoose";

const internshipSchema = mongoose.Schema(
  {
    company: {
        type: String,
        required: true,
    },
    location: {
      type: String,
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

export const Internship = mongoose.model("Internship", internshipSchema);
