const Canteen = require('../model/canteen.model');
const Staff = require('../model/staff.model');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';
// Register canteen 
exports.registerCanteen = async (req, res) => {
    try {
        const { canteenName, location, canteenDescription, category, openingHours, menu } = req.body;
        const canteen = await Canteen.create({ name: canteenName, location, canteenDescription, category, openingHours, menu });
        const createdCanteenId = canteen._id;
        console.log("created ID", createdCanteenId);

        const token = req.cookies.token // Get the JWT token from the request cookies
       console.log(token)
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = jwt.verify(token, secretKey)
        const loggedUser = Staff.findOne({ _id: user._id }).then(async (userData) => {
            const staffId = userData._id;
            console.log("Staff Id is ", staffId)
            const updatedStaff =  await Staff.findByIdAndUpdate(
                staffId,
                { $push: { ownedCanteens: createdCanteenId } },
                { new: true }
            );
        })
        res.status(201).json({ message: 'Canteen created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//get canteens
exports.getAllCanteens = async (req, res) => {
    try {
        const canteens = await Canteen.find().populate('menu');
        res.send({status:"ok",data:canteens})
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}
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
