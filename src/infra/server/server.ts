import express, { Application } from 'express';
import cors from 'cors';
import { bookRoutes } from '@app/routes/book.routes';
import { userRoutes } from '@app/routes/user.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(bookRoutes);
app.use(userRoutes);

export default app; 