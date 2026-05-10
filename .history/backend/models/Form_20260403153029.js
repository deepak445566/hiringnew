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
       
        const cleanPhone = phone.replace(/\D/g, '');
       
        return /^\d{10}$/.test(cleanPhone);
      },
      message: "Please enter a valid 10-digit phone number"
    },
    set: function(phone) {
    
      return phone.replace(/\D/g, '');
    }
  },
  
  jobPreference: String,
  message: String,
  resumeUrl: String,
  
}, { timestamps: true });

export default mongoose.model("Form", formSchema);