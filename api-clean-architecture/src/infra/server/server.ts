import express, { Application } from 'express';
import cors from 'cors';
import { bookRoutes } from '../../app/routes/book.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(bookRoutes);

export default app; 