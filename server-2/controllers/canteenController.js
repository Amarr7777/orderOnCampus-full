const Canteen = require('../model/canteen.model');

// Register canteen
exports.registerCanteen = async (req, res) => {
    try {
        const { canteenName, location, canteenDescription, category, openingHours, menu } = req.body;
        const canteen = await Canteen.create({ name:canteenName, location, canteenDescription, category, openingHours, menu});
        res.status(201).json({ message: 'Canteen created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCanteenMenu = async (req, res) => {
    try {
        const canteenId = req.params.canteenId;
        const canteen = await Canteen.findById(canteenId).populate('menu');
        if (!canteen) {
            return res.status(404).json({ message: "Canteen not found" });
        }
        res.json(canteen.menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
