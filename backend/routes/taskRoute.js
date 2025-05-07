
import express from 'express'
import taskModel from '../models/taskModel.js'
import authMiddleware from '../middleware/authMiddleware';
const router = express.Router();

// Create task
router.post('/create', async (req, res) => {
  const { contentTitle, description, status, userId } = req.body;
  const newTask = new taskModel({ contentTitle, description, status, userId });
  await newTask.save();
  res.status(201).json(newTask);
});

// Get all tasks for user
router.get('/', async (req, res) => {
  const tasks = await taskModel.find({ userId: req.userId });
  res.json(tasks);
});

// Edit task
router.put('/:id', authMiddleware,async (req, res) => {
  const { contentTitle, description, status } = req.body;
  const task = await taskModel.findByIdAndUpdate(req.params.id, { contentTitle, description, status }, { new: true });
  res.json(task);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await taskModel.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

router.get('/seetask', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // The user ID is added to req.user by authMiddleware
    const tasks = await taskModel.find({ userId })
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


export default router