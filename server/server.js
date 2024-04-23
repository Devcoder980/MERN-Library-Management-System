const http = require('http');
const express = require('express');
const cors = require('cors');

const app= express();

const server=http.createServer(app);

const port = process.env.PORT || 3000;
app.use(cors());

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});