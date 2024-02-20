// User internship (including company, location, start date, end date, description)
const mongoose = require('mongoose');
const User = require('./User.js');

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
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Internship", internshipSchema);
