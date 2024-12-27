import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.mjs';
import taskRoutes from './src/routes/taskRoutes.mjs';
dotenv.config();
connectDB();
const app = express();
const allowedOrigins = [
  'http://localhost:3000',        
  'https://task-manager-frontend-6b94.vercel.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
// Parse incoming JSON requests
app.use(express.json());
// Task routes
app.use('/tasks', taskRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ message });
});
const PORT = process.env.PORT||5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
