import express, { Application } from 'express';
import cors from 'cors';
import { bookRoutes } from '../../app/routes/book.routes';
import { connectToMongo } from '../database/mongoConnect';

const app: Application = express();

app.use(express.json());
app.use(cors());

connectToMongo();

app.use(bookRoutes);

export default app; 