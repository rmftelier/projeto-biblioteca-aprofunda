import app from "@infra/server/server";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta: ${PORT}`);
});