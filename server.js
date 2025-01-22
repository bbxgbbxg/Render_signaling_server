const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();
app.use(cors());

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

// Configure PeerServer
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/'  // This is important
});

// Root route
app.get('/', (req, res) => {
    res.send('Signaling server is running');
});

// Health check route
app.get('/health', (req, res) => {
    res.send('Server is running');
});

// Mount PeerJS server
app.use('/peerjs', peerServer);

// Optional: Add a route to check PeerJS status
app.get('/peerjs/status', (req, res) => {
    res.send('PeerJS server is running');
});
