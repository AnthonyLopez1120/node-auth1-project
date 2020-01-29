const express = require('express')

const userRouter = require('../routes/users_router.js');
const configureMiddleware = require('./configureMiddleware.js')

const server = express();

configureMiddleware(server);

server.use('/api', userRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: "Welcome to the jungle" });
});

server.get('/api', (req, res) => {
    res.status(200).json({ api: "Almost in the jungle" });
});

module.exports = server;