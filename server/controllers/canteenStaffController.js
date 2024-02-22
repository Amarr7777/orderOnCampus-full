const bcrypt = require('bcryptjs');
const canteenStaff = require('../model/canteenStaffDetails');

exports.registerCanteenStaff = async (req, res) => {
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
};

exports.loginCanteenStaff = async (req, res) => {
    // Logic for canteen staff login

    const { email, password } = req.body;
    try {
        const user = await canteenStaff.findOne({ email: email });
        if (user) {
            console.log("found")
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).json("An error occurred");
                }
                if (result) {
                    res.json("Success");
                } else {
                    res.json("Incorrect password");
                }
            });
        } else {
            res.json("No user found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
};
