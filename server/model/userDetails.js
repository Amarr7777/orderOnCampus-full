const mongoose = require('mongoose')

const userDetailsSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: Number,
    password: String,
}, {
    collection: "userInfo"
});

const userDetails = mongoose.model("userInfo",userDetailsSchema);
module.exports = userDetails ;
