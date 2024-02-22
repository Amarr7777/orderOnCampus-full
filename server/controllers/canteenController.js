const AllCanteen = require('../model/canteenDB');

exports.registerCanteen = async (req, res) => {
    // Logic for canteen registration 
    const { canteenName, location, canteenDescription, category, dishName, dishDescription, price } = req.body;
    try {
        const newDish = { dishName, dishDescription, price };
        await AllCanteen.create({
            canteenName,
            location: location,
            canteenDescription: canteenDescription,
            category,
            dishes: [newDish]
        });
        res.send({ status: 'ok', data: 'canteeen created' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', data: "Internal server error" });
    }
};
