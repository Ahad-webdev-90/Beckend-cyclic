const express = require('express');
const AuthController = require('../Controllers/authController');
const authRoute = express.Router();


authRoute.get('/', AuthController.getUsers)
authRoute.post('/signup', AuthController.signUp)
authRoute.post('/login', AuthController.login)

module.exports = authRoute