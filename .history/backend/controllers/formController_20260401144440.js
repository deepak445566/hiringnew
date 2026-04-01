// controllers/formController.js
import cloudinary from "../config/cloudinary.js";
import Form from "../models/Form.js";

export const submitForm = async (req, res) => {
  try {
    const { fullName, email, phone, jobPreference, message } = req.body;

    let resumeUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
      resumeUrl = result.secure_url;
    }

    const newForm = await Form.create({
      fullName,
      email,
      phone,
      jobPreference,
      message,
      resumeUrl,
    });

    res.json({
      success: true,
      message: "Form submitted",
      data: newForm,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllForms = async (req, res) => {
  const forms = await Form.find().sort({ createdAt: -1 });
  res.json({ success: true, forms });
};