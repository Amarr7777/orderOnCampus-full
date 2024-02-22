const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const canteenStaffDetailsSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    ownedCanteen: { type: Schema.Types.ObjectId, ref: 'AllCanteen' }
},{
    collection: "canteenStaffDetails"
})

mongoose.model("canteenStaffDetails",canteenStaffDetailsSchema)