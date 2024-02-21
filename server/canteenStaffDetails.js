const mongoose = require('mongoose')

const canteenStaffDetailsSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
},{
    collection: "canteenStaffDetails"
})

mongoose.model("canteenStaffDetails",canteenStaffDetailsSchema)