import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import connection from './conn/conn.js';
import auth from './routes/auth.js';
import list from './routes/list.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 1000;

// Establish database connection
connection;

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// For any other route, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
