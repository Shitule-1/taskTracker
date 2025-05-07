import express from 'express';
import cors from 'cors';
import connectDB from './DBconnection/conn.js';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js'
const app = express();
const PORT = 3000;

// ✅ CORS config must be BEFORE routes
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ JSON middleware
app.use(express.json());

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.use('/', userRouter);
app.use('/',taskRouter)
app.get('/', (req, res) => {
  res.send('Hello from Express using ES Modules!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
