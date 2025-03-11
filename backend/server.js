const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json());

// Uncomment these lines if you want HTTPS support (ensure certs exist)
// const key = fs.readFileSync('./certs/key.pem');
// const cert = fs.readFileSync('./certs/cert.pem');
// const server = https.createServer({ key, cert }, app);

// Use HTTP for now (change to HTTPS if needed)
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            'https://localhost:3000',
            'https://localhost:3001',
            'https://localhost:3002',
            'https://www.clyksnkutz.com'
        ],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Start the server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export for use in other modules
module.exports = { io, server, app };
