import express from 'express';
import {PrismaClient, Genre} from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

router.get("/" , async (req, res) => {
    const books = await prisma.books.findMany();
    res.json(books);
});
export default router;