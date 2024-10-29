const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['low', 'medium', 'high'] },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], required: true },
  category: { type: String },
  isRecurring: { type: Boolean },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  subtasks: [{ type: Schema.Types.ObjectId, ref: 'Subtask' }]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
