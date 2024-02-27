const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
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




app.use('/', routes);
app.listen(5001, () => {
    console.log("Server is running on port 5001");
})

