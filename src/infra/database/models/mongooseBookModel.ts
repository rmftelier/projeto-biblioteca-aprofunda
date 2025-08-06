import mongoose, { Schema } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number },
  format: { type: String },
  pages: { type: Number },
  genres: { type: Array },
  language: { type: String },
  status: { type: String, enum: ['available', 'borrowed'], default: 'available' },
  createdAt: { type: Date, default: Date.now }
});

export const bookModel = mongoose.model('Book', bookSchema);