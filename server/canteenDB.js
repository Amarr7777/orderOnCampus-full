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
    canteenName: String,
    // canteenImage: String,
    canteenDescription: String,
    location: String,
    category: String,
    favorite: Boolean,
    dishes: [dishSchema]
},{
    collection: "allCanteen"
});

mongoose.model('AllCanteen', restaurantSchema);

