import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;
import dotenv from "dotenv";
dotenv.config();
import authRouter from './controllers/authRouter.js';
import videoRouter from './controllers/videoRouter.js';
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/video",videoRouter);
app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on port ${PORT}`);
});

