const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
  teamName: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  permissions: [{ type: String, required: true }]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
