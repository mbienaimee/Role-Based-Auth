import express from "express"
import mongoose from "mongoose"
// import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import route from "./route/role.route.js"

const port = process.env.PORT || 3000
const db = process.env.DB || "mongodb://localhost:27017/Autho"
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(route)

mongoose.connect(db)
try{
    console.log("connected to db")
    app.listen(port, () => {
        console.log(`listening on port ${port}...`)
    })

}
catch(err){
    console.log(err)
}


