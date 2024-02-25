const jwt = require("jsonwebtoken");
const Staff = require('../model/staff.model')
const secretKey = 'your_secret_key';
// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.status(401).send('Unauthorized')
    };

    const user = jwt.verify(token, secretKey)
    const loggedUser = Staff.findOne({ _id: user._id }).then((userData) => {
        console.log("backend", userData);
        res.locals.user = userData;
        next();
    })
};


// module.exports = verifyToken;