import mongoose from 'mongoose';

export async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🟢 Conectado ao MongoDB Atlas com sucesso.');

  } catch (error) {
    console.log('🔴 Erro ao conectar ao MongoDB: ', error);
    process.exit(1);
  }
}