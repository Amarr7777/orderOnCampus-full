const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Staff = require('../model/staff.model')
const MenuItem = require('../model/menuItem.model')
const Canteen = require('../model/canteen.model')
const Order = require('../model/order.model');
// Register staff
exports.registerStaff = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const staff = await Staff.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'Staff member created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login staff
exports.loginStaff = async (req, res) => {
    try {
        const { email, password } = req.body;
        const staff = await Staff.findOne({ email });
        if (!staff || !await bcrypt.compare(password, staff.password)) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ id: staff._id }, 'your_secret_key');
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.updateMenuItemStock = async (req, res) => {
    const { dishId } = req.params;
    const { available } = req.body;

    try {
        const menuItem = await MenuItem.findByIdAndUpdate(dishId, { available }, { new: true });

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        return res.status(200).json({ message: "Menu item stock updated successfully", menuItem });
    } catch (error) {
        console.error("Error updating menu item stock:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.addMenuItem = async (req, res) => {
    const { name, price, description, available } = req.body;

    try {
        const newMenuItem = new MenuItem({ name, price, description, available });
        await newMenuItem.save();

        return res.status(201).json({ message: "Menu item added successfully", newMenuItem });
    } catch (error) {
        console.error("Error adding menu item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.setCanteenOpenStatus = async (req, res) => {
    const { canteenId } = req.body;
    const { openStatus } = req.body;

    try {
        const canteen = await Canteen.findByIdAndUpdate(canteenId, { openStatus }, { new: true });

        if (!canteen) {
            return res.status(404).json({ message: "Canteen not found" });
        }

        return res.status(200).json({ message: "Canteen open status updated successfully", canteen });
    } catch (error) {
        console.error("Error updating canteen open status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getCanteenOrders = async (req, res) => {
    try {
        const canteenId = req.params.canteenId;
        const orders = await Order.find({ canteenId });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const newStatus = req.body.status;

        const order = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};