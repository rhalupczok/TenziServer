const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TenziUserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    scores: [
        {
            username: { type: String },
            time: { type: Number },
            fouls: { type: Number },
        },
    ],
    roles: {
        User: {
            type: Number,
            default: 2001,
        },
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: [String],
});

module.exports = mongoose.model("Tenziuser", TenziUserSchema);
