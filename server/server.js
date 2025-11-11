import express from "express";
import cors from "cors";
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 3000

connectDB();

app.use(express.json());
app.use(cookieParser());
const allowdOrigins = ['http://localhost:5173']
app.use(cors({origin:allowdOrigins,credentials: true}))

// API endpoints...
app.get('/',(req,res)=>res.send('API working!'))
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.listen(port,()=>console.log(`Server started at port ${port}`));