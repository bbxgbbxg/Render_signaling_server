const express = require('express');
const { ExpressPeerServer } = require('peer');
const cors = require('cors');

const app = express();
app.use(cors());

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

const peerServer = ExpressPeerServer(server, {
    path: '/myapp',
    debug: true
});

// Add root route
app.get('/', (req, res) => {
    res.send('Signaling server is running');
});

// Health check route
app.get('/health', (req, res) => {
    res.send('Server is running');
});

app.use('/', peerServer);
