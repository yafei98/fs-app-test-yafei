import express from 'express'
import cors from 'cors'
import loggers from 'cookies-logger'
import { connectDB } from './config/db.js'
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import foodRouter from './routes/foodRoute.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//app config
const app = express()
const port = 4000

//cookie logger
loggers();

// middleware
app.use(express.json())
app.use(cors())


//db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://dulanjalisenarathna93:E2JUb0zfaT2FVp8D@cluster0.exkxkun.mongodb.net/?