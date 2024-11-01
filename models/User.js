const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
