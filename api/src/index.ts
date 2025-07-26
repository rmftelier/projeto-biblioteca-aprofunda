import app from "@infra/server/server";

app.listen(process.env.PORT, () => {
  console.log(`O servidor está rodando na porta: ${process.env.PORT}`);
});