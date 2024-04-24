const http = require('http');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { connectDb } = require('./config/dbConnection');
const errorHandler = require('./Middleware/errorHandler');
// Import the proxy configuration
const proxy = require('./Middleware/proxy');

const app = express();
connectDb();
const server = http.createServer(app);
// Use the proxy configuration
proxy(app);

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded() for parsing URL-encoded request bodies

app.use('/api/v1', require('./routes/authRoutes'));
app.use('/api/v1', require('./routes/booksRoutes'));
app.use('/api/v1', require('./routes/purchasesRoutes'));
app.use('/api/mail/v1', require('./routes/mailRoutes'));

app.use(errorHandler);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});