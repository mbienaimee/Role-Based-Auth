import employeeModel from "../model/employee.js";

const employeeController = {
  create: async (req, res) => {
    try {
      // Check if employee already exists
      const existingemployee = await employeeModel.findOne({
        email: req.body.email,
      });
      if (existingemployee) {
        return res.status(400).json({ message: "employee already exists" });
      }

      // Create a new employee
      const newemployee = await employeeModel.create({
        name: req.body.name,
        email: req.body.email,
      });

      // Respond
      res.status(201).json({
        message: "employee created successfully",
        employee: newemployee,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
export default employeeController