import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import router from './routes/BooksRoutes.js';
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3008;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello from Express!");
});
app.use("/api/v1/", router);
app.listen(port, () => {
    console.log("Server is running...");
})