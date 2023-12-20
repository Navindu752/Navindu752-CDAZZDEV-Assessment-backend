const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    accessToken: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;