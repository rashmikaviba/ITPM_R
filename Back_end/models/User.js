import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Contract: { type: String },
  Nationality: { type: String },
  Gender: { type: String },
  address: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
