const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DB_URI).then(console.log("Connected!"))

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
	balance: {
        type: Number,
        require: true
    }
})

const User = mongoose.model("User", userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = {User, Account}