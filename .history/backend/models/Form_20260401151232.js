// models/Form.js
import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  fullName: String,
  
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/,
      "Please enter a valid email address"
    ]
  },
  
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    validate: {
      validator: function(phone) {
        // Remove any non-digit characters
        const cleanPhone = phone.replace(/\D/g, '');
        // Check if it's exactly 10 digits
        return /^\d{10}$/.test(cleanPhone);
      },
      message: "Please enter a valid 10-digit phone number"
    },
    set: function(phone) {
      // Store only digits
      return phone.replace(/\D/g, '');
    }
  },
  
  jobPreference: String,
  message: String,
  resumeUrl: String,
  
}, { timestamps: true });

export default mongoose.model("Form", formSchema);