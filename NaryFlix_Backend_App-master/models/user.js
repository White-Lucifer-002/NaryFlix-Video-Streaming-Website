const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    pwd: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: Number,
        required: true
    },
    subsPlan: {
        type: String,
        default: "none"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('test-sign', userSchema);

module.exports = User;