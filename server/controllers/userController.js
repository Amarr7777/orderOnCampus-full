const bcrypt = require('bcryptjs');
const User = require('../model/userDetails');

exports.registerUser = async (req, res) => {
    const { name, email, mobile, password } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        res.json('exists')
    } else {
        const encryptedPassword = await bcrypt.hash(password, 10);
        try {
            await User.create({
                name: name,
                email: email,
                mobile,
                password: encryptedPassword,
            });
            res.send({ status: 'ok', data: "user created" });
        } catch (error) {
            res.status(500).send({ status: 'error', data: error });
        }
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await User.findOne({ email: email });
        if (data) {
            console.log("found")
            bcrypt.compare(password, data.password, (err, result) => {
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
