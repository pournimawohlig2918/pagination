const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);
