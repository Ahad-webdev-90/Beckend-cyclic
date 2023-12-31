const express = require('express');
const route = require('./route/courseRoute');
const authRoute = require('./route/authRoute');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
const router = require('./route/TeamRoute');
const { info } = require('console');
require('dotenv').config()


const App = express();

App.get("/", (req, res) => {
    res.send("Server Started");
});

const server = http.createServer(App);
const io = socketIo(server);
App.set('io', io);

App.use(express.json())
App.use("/courses", route)
App.use("/auth", authRoute)
App.use("/Team", router)

mongoose
    .connect(process.env.MONGO_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        info()
        io.on('connection', (socket) => {
            console.log('User connected');
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
            App.set('socket', socket);
        });
        App.listen(process.env.PORT, () => {
            console.log(
                `Database Connected and server is listening http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });