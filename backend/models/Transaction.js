const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
      default: "expense",
    },
  },
  {
    timestamps: true,
  },
);

// Create text index for search functionality
transactionSchema.index({ description: "text" });

module.exports = mongoose.model("Transaction", transactionSchema);
