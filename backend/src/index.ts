import express from "express";
import cors from "cors";
import morgan from "morgan";
// import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { PrismaClient } from "./generated/prisma";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import tableRoutes from "./routes/tableRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

export const prisma = new PrismaClient();


const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/tables/", tableRoutes);
app.use("/api/orders/", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
