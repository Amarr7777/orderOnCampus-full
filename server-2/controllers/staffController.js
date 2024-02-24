const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Staff = require('../model/staff.model')
const MenuItem = require('../model/menuItem.model')
const Canteen = require('../model/canteen.model')
const Order = require('../model/order.model');
const secretKey = 'your_secret_key';



// Register staff
exports.registerStaff = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a staff member with the same email already exists
        const existingStaff = await Staff.findOne({ email: email });
        if (existingStaff) {
            return res.json('user already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new staff member
        const staff = await Staff.create({ username: name, email, password: hashedPassword });
        const token = jwt.sign({ _id: existingStaff._id }, secretKey, { expiresIn: '24h' });
        res.cookie("token", token)

        // Respond with success message
        res.status(201).json({ message: 'Staff member created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

// Login staff
exports.loginStaff = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Staff.findOne({ email: email });
        if (user) {
            console.log("found")
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).json("An error occurred");
                }
                if (result) {
                    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '24h' });
                    res.cookie("token", token)
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

//authentication
exports.authStaff = async(req,res) => {
    // console.log(res.data)
    const userData = res.locals.user;
    res.json({ userData });
}

exports.logout =async(req,res) => {
    res.clearCookie('token').send('Token cookie cleared successfully');
}


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
        const canteenId = '65d8a8e352d87f8fc2eaa565'
        const newMenuItem = new MenuItem({ name, price, description, available });
        await newMenuItem.save();
        console.log(newMenuItem._id)
        const canteen = await Canteen.findById(canteenId);
        canteen.menu.push(newMenuItem._id);
        await canteen.save();
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