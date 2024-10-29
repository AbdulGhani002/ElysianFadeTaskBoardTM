const mongoose = require('mongoose');
const { Schema } = mongoose;

const subtaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], required: true },
  parentTaskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  dueDate: { type: Date },
  priority: { type: String, enum: ['low', 'medium', 'high'] }
});

const Subtask = mongoose.model('Subtask', subtaskSchema);

module.exports = Subtask;
