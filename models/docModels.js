const mongoose = require('mongoose');  

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
    },
    feesPerConsultation: {  // Corrected spelling here
      type: Number,
      required: [true, "Fees per consultation is required"],
    },
    status: {
      type: String,
      default: "Pending",
    },
    timing: {
      type: [String],  // Storing timing as an array of strings
      required: [true, "Work timing is required"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
