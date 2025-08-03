import dotenv from 'dotenv';

if (process.env.NODE_ENV != 'production') {
  dotenv.config();
}

export const config = {
  port: process.env.PORT || 3000,
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/library',
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key', 
  nodeEnv: process.env.NODE_ENV || 'development'
}
