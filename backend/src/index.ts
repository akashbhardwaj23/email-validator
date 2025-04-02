import express from "express"
import cors from "cors"
import userRouter from "./routes/user-route"
import dotenv from "dotenv"

const app = express()


dotenv.config()
app.use(cors())
app.use(express.json())



app.use("/api",userRouter)


app.listen(3001, () => {
    console.log(`Server Running on port 3001`)
})