import express from 'express';
import cors from 'cors';
import connectDB from './DBconnection/conn.js';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js'
const app = express();
const PORT = 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

connectDB();

app.use('/', userRouter);
app.use('/',taskRouter)
app.get('/', (req, res) => {
  res.send('Hello from Express using ES Modules!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
