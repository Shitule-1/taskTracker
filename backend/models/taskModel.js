import mongoose from 'mongoose'
const TaskSchema = new mongoose.Schema({
  contentTitle: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const taskModel=mongoose.model('Task',TaskSchema)

export default taskModel