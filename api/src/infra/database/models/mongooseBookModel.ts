import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedAt: { type: Date },
  format: { type: String },
  pages: { type: Number },
  genres: { type: Array },
  language: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const bookModel = mongoose.model('Book', bookSchema);