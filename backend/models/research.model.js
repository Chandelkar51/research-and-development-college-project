const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["area", "scholar"],
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    faculty: {
      type: [String],
      default: [],
    },
    name: {
      type: String,
      trim: true,
    },
    roll: {
      type: String,
      trim: true,
    },
    thesis: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
    guide: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Research", researchSchema);
