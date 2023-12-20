const express = require('express');
const route = require('./route/courseRoute');
const authRoute = require('./route/authRoute');
const mongoose = require('mongoose');
const router = require('./route/TeamRoute');
require('dotenv').config()

const App = express();

App.use(express.json())
App.use("/courses", route)
App.use("/auth", authRoute)
App.use("/Team", router)

mongoose
    .connect(process.env.MONGO_KEY)
    .then((res) => {
        App.listen(process.env.PORT, () => {
            console.log(
                `Database Connected and server is listening http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });