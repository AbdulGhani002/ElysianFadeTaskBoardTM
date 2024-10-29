const mongoose = require('mongoose');
const { Schema } = mongoose;

const goalSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
