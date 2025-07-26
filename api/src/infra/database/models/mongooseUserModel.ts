import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
});

export const userModel = mongoose.model('User', userSchema);

