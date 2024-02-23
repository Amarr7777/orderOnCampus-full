const AllCanteen = require('../model/canteenDB');

exports.registerCanteen = async (req, res) => {
    // Logic for canteen staff registration

    const { name, email, password } = req.body;
    const oldUser = await canteenStaff.findOne({ email: email });
    if (oldUser) {
        res.json('user already exists')
    } else {
        const encryptedPassword = await bcrypt.hash(password, 10);
        try {
            await canteenStaff.create({
                name,
                email,
                password: encryptedPassword,
            });
            res.send({ status: 'ok', data: "canteen staff created" });
        } catch (error) {
            res.status(500).send({ status: 'error', data: error });
        }
    }
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



