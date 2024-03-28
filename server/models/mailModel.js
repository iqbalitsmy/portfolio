const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
});

const UserMail = mongoose.model('UserMail', mailSchema);

module.exports = UserMail;
