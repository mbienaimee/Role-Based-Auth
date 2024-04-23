import roleModel from "../model/role.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const roleController = {
  signup: async (req, res) => {
    try {
      // Check if user already exists
      const existingUser = await roleModel.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user
      const newUser = await roleModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      });

      // Respond
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Must provide email and password" });
      }

      // Find user in database
      const user = await roleModel.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      // Generate token
      const secret = process.env.SECRET;
      const token = jwt.sign({ user_id: user.id }, secret, { expiresIn: "3h" });

      // Set token as a cookie
      const options = {
        expiresIn: "3h",
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token: token,
        user: user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default roleController;
