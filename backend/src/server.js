import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import protect from './middleware/authMiddleware.js';

dotenv.config(); //Makes envroment variable available from .env

connectDB(); //Connect Databse

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.get("/", protect, (req, res) =>{
    res.send("API is running");
});

app.listen(PORT, () =>{
    console.log(`Server is running at PORT ${PORT}`);
});