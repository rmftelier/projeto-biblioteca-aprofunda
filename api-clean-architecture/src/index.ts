import express, { Application } from "express";
import cors from "cors";
import routes from "./routes/biblioteca-routes";

const PORT = 3000;
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta: ${PORT}`);
});