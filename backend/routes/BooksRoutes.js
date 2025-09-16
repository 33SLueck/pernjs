import express from 'express';
import {PrismaClient, Genre} from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

router.get("/" , async (req, res) => {
    const books = await prisma.books.findMany();
    res.json(books);
});

router.get("/genres", async (req,res) => {
    res.json(Object.values(Genre));
});
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) {
        return res.status(400).json({error:"Id fehlt oder unggültig" });
    }
    const book = await prisma.books.findUnique({where: { id }});
    if (!book) {
        return res.status(404).json({error:"Buch nicht gefunden" });
    }
    res.json(book);
});
router.post("/", async (req, res) => {
    const {title,genre,isbn} = req.body;
    if (!title || !genre ) {
        return res.status(400).json({error:"title und genre sind erforderlich"});
    }
    const newBook = await prisma.books.create({
        data: {title, genre, isbn},
    });
    res.status(201).json(newBook);
});
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
     if (!id) {
        return res.status(400).json({error:"Id fehlt oder unggültig" });
    }
    await prisma.books.delete({where: {id}});
    res.status(204).end();
});
router.put("/:id", async (req, res) => {
const id =Number(req.params.id);
 if (!id) {
        return res.status(400).json({error:"Id fehlt oder unggültig" });
    }
const {title,genre,isbn } = req.body;
 const updatedBook = await prisma.books.update({
    where: {id},
    data: {title, genre, isbn},
 });
 res.json(updatedBook);
});
export default router;