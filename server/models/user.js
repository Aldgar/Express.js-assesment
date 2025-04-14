import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  about: { type: String },
  score: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);


export default User;