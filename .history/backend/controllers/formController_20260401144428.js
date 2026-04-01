// models/Form.js
import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  jobPreference: String,
  message: String,
  resumeUrl: String,
}, { timestamps: true });

export default mongoose.model("Form", formSchema);