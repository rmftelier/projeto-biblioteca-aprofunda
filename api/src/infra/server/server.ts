import express, { Application } from 'express';
import cors from 'cors';
import { bookRoutes } from '@app/routes/book.routes';
import { connectToMongo } from '@infra/database/mongoConnect';
import { userRoutes } from '@app/routes/user.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(bookRoutes);
app.use(userRoutes);

connectToMongo();

export default app; 