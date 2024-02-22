const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');

app.use(cors());
app.use(express.json())

const bcrypt = require('bcryptjs')

const mongoUrl = "mongodb+srv://amarpradeep0805:amar1221@cluster0.khkxyni.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl).then(() => {
    try {
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
})

require('./userDetails');
require('./canteenDB')
require('./canteenStaffDetails')
const user = mongoose.model("userInfo");
const canteenStaff = mongoose.model("canteenStaffDetails")
const canteen = mongoose.model("AllCanteen");

app.get("/", (req, res) => {
    res.send({ status: "Server is running" });
})

// register user
app.post("/register", async (req, res) => {
    const { name, email, mobile, password } = req.body;
    const oldUser = await user.findOne({ email: email });
    if (oldUser) {
        res.json('exists')
    }else {
        const encryptedPassword = await bcrypt.hash(password, 10);
        try {
            await user.create({
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

});

// register canteen staff

app.post("/registerCanteenStaff", async (req, res) => {
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
});

// login canteen staff
app.post("/loginStaff", async (req, res) => { 
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
});

// register canteen
app.post("/registerCanteen", async (req, res) => {
    const { canteenName, location, canteenDescription, category, dishName, dishDescription, price } = req.body;
    try {
        const newDish = { dishName, dishDescription, price };
        await canteen.create({
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
});

app.listen(5001, () => {
    console.log("Server is running on port 5001");
})

