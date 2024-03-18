// User apartment listing (includes location, rent, start date, end date, description)
const mongoose = require('mongoose');
const User = require('./User.js');

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
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
