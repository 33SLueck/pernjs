import express from 'express';
import cors from 'cors';
import helmet, { dnsPrefetchControl, hidePoweredBy } from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import router from './routes/BooksRoutes.js';
import reviewsRouter from './routes/ReviewsRoutes.js';
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3008;
app.use(cors());
const helmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'none'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'"],
            connectSrc: ["'self'", "http://localhost:5173"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"]
        },
    },
    referrerPolicy: { policy : 'no-referrer' },
    frameGuard: {action: 'deny' },
    xssFilter:true,
    noSniff:true,
    dnsPrefetchControl: { allow: false},
    hidePoweredBy: { setTo: 'PHP 4.2.0'}
};
if (process.env.NODE_ENV === 'production') {
    helmetOptions.hsts= {
        maxAge: 63072000,
        includeSubDomains: true,
        preload:true,
    }
}
    else {
        helmetOptions.hsts = false;
    }
app.use(helmet(helmetOptions));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello from Express!");
});
app.use("/api/v1/", router);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.listen(port, () => {
    console.log("Server is running...");
})