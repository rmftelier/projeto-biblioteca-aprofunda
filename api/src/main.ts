import app from "@infra/server/server";
import { connectToMongo } from "@infra/database/mongoConnect";
import { config } from "config/environment";

const PORT = config.port;
const URL = config.mongoURL;

connectToMongo(URL).then(() => {
  app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta: ${PORT}`);
  });
});
