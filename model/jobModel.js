const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String, // JD link OR text
  },
  appliedDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Rejected", "Offered"],
    default: "Applied",
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
