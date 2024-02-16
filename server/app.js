const express = require('express');
const app = express();
const mongoose = require('mongoose')
app.use(express.json())
const bcrypt = require('bcryptjs')

const mongoUrl = "mongodb+srv://amarpradeep0805:amar1221@cluster0.khkxyni.mongodb.net/?retryWrites=true&w=majority/orderOnCampus"

mongoose.connect(mongoUrl).then(() => {
    try {
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
})
require('./userDetails');
const user = mongoose.model("userInfo");

app.get("/", (req, res) => {
    res.send({ status: "Server is running" });
})

app.listen(5001, () => {
    app.post("/register", async (req, res) => {
        const { name, email, mobile, password } = req.body;
        const oldUser = await user.findOne({ email: email });

        if (oldUser) {
            return res.send({ data: 'user already exists' })
        }
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
            res.send({ status: 'error', data: error });
        }

    })
    console.log("Server is running on port 5001");
})

