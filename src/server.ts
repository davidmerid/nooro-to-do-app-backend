import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001; // Default port is 3001 if not set in environment

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Verify database connection
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    // Respond with error if the database is unreachable
    res.status(500).json({ status: 'Error', database: 'Disconnected' });
  }
});

// Mount task-related routes
app.use('/api/tasks', taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
