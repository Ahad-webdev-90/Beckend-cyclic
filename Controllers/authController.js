const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AuthModel = require("../models/authModel")
const { Send } = require("../Helper/courseHelper")

const AuthController = {
    signUp: async (req, res) => {
        try {
            const { email, password, contactNo , firstName , lastName , gender , profilePicture , dateOfBirth } = req.body
            const obj = { email, password, contactNo , firstName , lastName , gender , profilePicture , dateOfBirth }
            const errArr = []
            if (!obj.firstName){
                errArr.push("FirstName is required")
            }
            if (!obj.lastName){
                errArr.push("lastName is required")
            }
            if (!obj.email) {
                errArr.push("email is required")
            }
            if (!obj.password) {
                errArr.push("Password is required")
            }
            if (errArr.length > 0) {
                res.send(Send(false, "Validation Error", errArr))
            }

            const checkUser = await AuthModel.findOne({ email: obj.email })
            if (checkUser) {
                res.send(Send(false, "User Already Exist", null))
                return;
            }
            obj.password = await bcrypt.hash(obj.password, 10)
            const user = new AuthModel(obj)
            const result = await user.save()
            if (result) {
                res.send(Send(true, "Welcome", result))
            }

        }
        catch (error) {
            res.status(404).send(Send(false, error, null))
        }
    },
    login: async (req, res) => {
        try {
            console.log(req.body)
            const { email = "", password = "" } = req.body
            if (email && password) {
                const obj = { email, password }
                const userExist = await AuthModel.findOne({ email: obj.email })
                if (userExist) {
                    let correctPassword = await bcrypt.compare(obj.password, userExist.password)
                    if (correctPassword) {
                        const token = jwt.sign({ ...userExist }, process.env.SECRET_KEY)
                        const data = {
                            email: userExist.email,
                            token
                        }
                        res.status(200).send(Send(true, "Data Added Successfully", { user: data }))
                    }
                    else {
                        res.status(400).send(Send(false, "Data Not Found", null))
                    }
                }

                else {
                    res.status(404).send(Send(false, "User Not Found", null))
                }
            }
            else {
                res.status(404).send(Send(false, "Credentials not found", null))
            }
        }
        catch (error) {
            res.status(400).send(Send(false, error, null))
        }
    },
    getUsers: async (req, res) => {
        try {
            const allUsers = await AuthModel.find()
            res.status(200).send(Send(true, 'all Users', allUsers))
        }
        catch (error) {
            res.status(404).send(Send(true, 'You are No Rights for this Action', error))
        }

    },
    protected: (req, res, next) => {
        // bearer token = (ahahahahahahaha)
        const token = req.headers.authorize?.split(" ")[1]
        if (!token) {
            res.status(401).send(Send(false, "Un Authorized", null))
            return
        }
        else {
            jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
                if (err) {
                    res.status(401).send(Send(false, "Un Authorized", err.message))
                    return
                }
                else {
                    res.status(401).send(Send(true, "Authorized", next))
                    next()
                    return

                }
            })
        }
    },
}

module.exports = AuthController