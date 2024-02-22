const mongoose = require('mongoose')

const canteenUserDetailsSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    mobile: String,
    password: String,
}, {
    collection: "canteenUserInfo"
});

mongoose.model("canteenUserInfo",canteenUserDetailsSchema);
