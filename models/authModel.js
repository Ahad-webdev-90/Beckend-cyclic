const mongoose = require('mongoose');
const AuthScheema = mongoose.Schema({
    firstName: {
        type: String,
        require: (true, "FirstName must be required")
    },
    lastName: {
        type: String,
        require: (true, "FirstName must be required")
    },
    email: {
        type: String,
        require: (true, "email must be required")
    },
    password: {
        type: String,
        require: (true, "Password must be required")
    },
   }, {
    timestamps: true
})

const AuthModel = mongoose.model('/authusers', AuthScheema)

module.exports = AuthModel