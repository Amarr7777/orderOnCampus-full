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
        const token = jwt.sign({ _id: staff._id }, secretKey, { expiresIn: '24h' });
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
exports.authStaff = async (req, res) => {
    // console.log(res.data)
    const userData = res.locals.user;
    await userData
        // .populate('ownedCanteens')
        .populate({
            path: 'ownedCanteens',
            populate: {
                path: 'menu'
            }
        })
        console.log("staff data", userData)
        res.send({ status: "ok", data: userData });
}

exports.logout = async (req, res) => {
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
        const newMenuItem = new MenuItem({ name, price, description, available });
        await newMenuItem.save();
        console.log(newMenuItem._id)
        const token = req.cookies.token;
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = jwt.verify(token, secretKey)
        const loggedUser = Staff.findOne({ _id: user._id }).then(async (userData) => {
            const canteenId = userData.ownedCanteens;
            console.log("Staff Id is ", canteenId)
            const canteen = await Canteen.findById(canteenId);
            canteen.menu.push(newMenuItem._id);
            await canteen.save();
        })
        return res.status(201).json({ message: "Menu item added successfully", newMenuItem });

    } catch (error) {
        console.error("Error adding menu item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.editMenuItem = async (req, res) => {
    const menuItemId = req.params.menuItemId; // Get the _id of the menu item to be edited
    const { name, price, description, available } = req.body; // Get the updated properties from the request body
    console.log(menuItemId)
    try {
        // Find the menu item by its _id and update its properties
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            menuItemId,
            { name, price, description, available },
            { new: true } // Return the updated document
        );

        // If the menu item is not found, return a 404 error
        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        return res.status(200).json({ message: 'Menu item updated successfully', updatedMenuItem });
    } catch (error) {
        console.error("Error editing menu item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//delete
exports.deleteMenuItem = async (req, res) => {
    const menuItemId = req.params.menuItemId; 

    try {
        const deletedMenuItem = await MenuItem.findByIdAndDelete(menuItemId);

        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        return res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error("Error deleting menu item:", error);
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