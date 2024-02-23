const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const Order = require('../model/order.model')

// Register user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ id: user._id }, 'your_secret_key');
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
// favorites
exports.getFavorites = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming user ID is available in the request object after authentication
        const user = await User.findById(userId).populate('favorites');
        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve favorites' });
    }
};
// orders
exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming user ID is available in the request object after authentication
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve orders' });
    }
};
// paymentDetails
// exports.updatePaymentDetails = async (req, res) => {
//     try {
//         const userId = req.user.userId; // Assuming user ID is available in the request object after authentication
//         const { paymentDetails } = req.body;
//         await User.findByIdAndUpdate(userId, { paymentDetails }, { new: true });
//         res.status(200).json({ message: 'Payment details updated successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Could not update payment details' });
//     }
// };