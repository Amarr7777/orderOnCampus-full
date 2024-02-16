const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    image: String
});

const restaurantSchema = new Schema({
    name: String,
    image: String,
    description: String,
    location: String,
    categories: [String],
    favorite: Boolean,
    dishes: [dishSchema]
});

const allCanteensSchema = new Schema({
    title: String,
    restaurants: [restaurantSchema]
},{
    collection: "allCanteen"
});

mongoose.model('AllCanteens', allCanteensSchema);

