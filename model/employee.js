import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }


}, { timestamps: true });

const employeeModel = mongoose.model("employee",employeeSchema);
export default employeeModel
