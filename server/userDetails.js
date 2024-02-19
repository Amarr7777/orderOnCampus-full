const mongoose = require('mongoose')

const userDetailsSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: Number,
    password: String,
}, {
    collection: "userInfo"
});

mongoose.model("userInfo",userDetailsSchema);
