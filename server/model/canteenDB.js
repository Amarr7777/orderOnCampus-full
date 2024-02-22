const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    dishName: String,
    // category: String,
    dishDescription: String,
    price: Number, 
    // dishImage: String
});

const restaurantSchema = new Schema({
    user:  { type: Schema.Types.ObjectId, ref: 'canteenStaffDetails' },
    canteenName: String,
    // canteenImage: String,
    canteenDescription: String,
    location: String,
    category: String,
    favorite: Boolean,
    dishes: [dishSchema],
    staff: { type: Schema.Types.ObjectId, ref: 'CanteenStaffDetails' },
},{
    collection: "allCanteen"
});

const AllCanteen = mongoose.model('AllCanteen', restaurantSchema);
module.exports =  AllCanteen ;

