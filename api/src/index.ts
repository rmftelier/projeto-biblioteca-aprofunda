import app from "@infra/server/server";
import { connectToMongo } from "@infra/database/mongoConnect";

connectToMongo().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`O servidor está rodando na porta: ${process.env.PORT}`);
  });
});
