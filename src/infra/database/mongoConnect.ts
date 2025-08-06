import mongoose from 'mongoose';

export async function connectToMongo(URL: string) {
  try {
    await mongoose.connect(URL);
    console.log('🟢 Conectado ao MongoDB Atlas com sucesso.');

  } catch (error) {
    console.log('🔴 Erro ao conectar ao MongoDB: ', error);
    process.exit(1);
  }
}