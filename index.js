import express from 'express';
import connection from './conn/conn.js';
import auth from './routes/auth.js';
import list from './routes/list.js';
import cors from 'cors';



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


// Serve React app for all other routes

    
// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
