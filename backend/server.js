import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import ProductRoute from './routes/productRoutes.js';   
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
connectDB();

const app = express();

const port = 9090;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:19006'], // Add your Expo development server URLs
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", ProductRoute);
app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log(`Sever running on port ${port}`);
});