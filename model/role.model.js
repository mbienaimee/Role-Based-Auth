import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const roleModel = mongoose.model("Role",roleSchema);
