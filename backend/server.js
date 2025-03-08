
const fs = require('fs');
const https = require('https')
const http = require('http')
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const socketio = require('socket.io');
app.use(express.static(__dirname+'/public'));
app.use(express.json());


// const key = fs.readFileSync('./certs/key.pem');
// const cert = fs.readFileSync('./certs/cert.pem');

// const expressServer = https.createServer({key, cert}, app);
const expressServer = http.createServer({}, app);
const io = socketio(expressServer,{
    cors: ['https://localhost:3000',
            'https://localhost:3001',
            'https://localhost:3002',
            'https://www.clyksnkutz.com'
            ]
})

expressServer.listen(9000);
module.exports ={io,expressServer,app}; 
