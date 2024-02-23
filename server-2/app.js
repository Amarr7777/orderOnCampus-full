const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
// const cookie = require('cookie-parser')
const bodyParser = require('body-parser');


app.use(cors());
// app.use(cookie())
app.use(express.json())
app.use(bodyParser.json());

const routes = require('./routes/routes');

// const bcrypt = require('bcryptjs')

const mongoUrl = "mongodb+srv://amarpradeep0805:amar1221@cluster0.khkxyni.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl).then(() => {
    try {
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
})

// const secretKey = 'your_secret_key';

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(401).send('Unauthorized');

//     jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) return res.status(401).send('Unauthorized');
//         req.userId = decoded.id;
//         next();
//     });
// };

app.use('/', routes);
app.listen(5001, () => {
    console.log("Server is running on port 5001");
})

