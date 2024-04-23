import roleModel from "../model/role.model.js";
import bcrypt from "bcrypt";

const roleController = {
  signup: async (req, res) => {
    try {
        console.log(req.body)
        //find if user is already existing
        const existingUser = await roleModel.findOne({email: req.body.email})
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
        //hashPassword
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        


        //create a new user
        const newUser = await roleModel.save({
            name: req.body.name,
            email: req.body.email,
            password:hashedPassword,
            role:req.body.role

        })
        //responding
        res.status(201).json()
      // Your signup logic here
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default roleController;
