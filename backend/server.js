import express from "express"
import cors from "cors"
import "dotenv/config.js"
import connectDb from "./config/db.js"
import router from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"
import postRouter from "./routes/postRouter.js"

//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDb();

//api endpoints
app.use("/api",router)
app.use("/api/users",userRouter)
app.use("/api/posts",postRouter)


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);  
})