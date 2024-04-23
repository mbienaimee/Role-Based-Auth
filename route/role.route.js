import roleController from "../controller/role.controller.js"
import employeeController from "../controller/employee.controller.js"
import employeeMiddleware from "/Users/USER/Desktop/Role-Based-Auth/middleware/role.middleware.js"
import {Router} from "express"
const route = Router()

route.post("/signup",roleController.signup) 
route.post("/login",roleController.login) 
route.post("/addemployee",employeeMiddleware,employeeController.create)
export default route