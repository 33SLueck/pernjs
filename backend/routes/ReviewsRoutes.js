import express from 'express';
import {PrismaClient} from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

router.get("/all", async (req, res) => {
    const reviews = await prisma.reviews.findMany();
    res.json(reviews);
});

router.get("/single/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) {
        return res.status(400).json({error: "Id fehlt oder ungültig"});
    }
    const review = await prisma.reviews.findUnique({where : {id}});
    if (!review) {
        return res.status(404).json({error: "Bewertung nicht gefunden"});
    }
    res.json(review);
});

router.get("/book/:bookId", async (req, res) => {
    const bookId = Number(req.params.bookId);
    if (!bookId) {
        return res.status(400).json({error: "bookId fehlt oder ungültig."});
    }
    const reviews = await prisma.reviews.findMany({where: {bookId}});
    if (!reviews) {
        return res.status(404).json({error: "Keine Bewertungen für dieses Buch gefunden."});
    }
    res.json(reviews);
});

router.post("/add", async (req, res) => {
    const {bookId, rating, text} = req.body;
    if (!bookId || !rating || !text) {
        return res.status(400).json({error: "bookId, rating und text sind erforderlich."});
    }
    const existingBook = await prisma.books.findUnique({where: {id: bookId}});
    if (!existingBook) {
        return res.status(404).json({error: "Buch mit der angegebenen bookId nicht gefunden."});
    }
    const newReview = await prisma.reviews.create({ data: {bookId,rating, text}});
    res.json(newReview);
});
router.put("/update/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!id) {
        return res.status(400).json({error: "Id fehlt oder ungültig."});
    }
    const { rating ,text} = req.body;
    const updatedReview = await prisma.reviews.update({where: {id}, data: {rating,text}});
    res.json(updatedReview);
});

router.delete("/delete/:id", async (req, res)=> {
const id = Number(req.params.id);
if (!id) {
    return res.status(400).json({error: "Id fehlt oder ungültig."});
}
await prisma.reviews.delete({where: {id}});
res.sendStatus(204);
});

export default router;