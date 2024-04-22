import User from "./user.model.js";
import bcryptjs from "bcryptjs";
// import Reservation from "../src/reservation/reservation.model.js"


export const registerUser = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        const user = new User({ username, password, email, role })

        const salt = bcryptjs.genSaltSync();

        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(201).json({ msg: "User successfully created", user })
    } catch (error) {

        res.status(500).json({ msg: "Error creating user" });
    }
};

export const getUser = async (req = request, res = response) => {

    try {

        const { username, email, role, status } = req.query;

        const filter = {};
        if (username) filter.username = { $regex: username, $options: 'i' };
        if (email) filter.email = { $regex: email, $options: 'i' };
        if (role) filter.role = { $regex: role, $options: 'i' };
        if (status !== undefined) filter.status = status;

        const users = await User.find(filter);

        const total = users.length;

        res.status(200).json({ total, users });
    } catch (error) {

        res.status(500).json({ error: 'Error getting users' });
    }
}

export const updateUser = async (req, res = response) => {

    try {

        const { id } = req.params;

        const { _id, password, ...remain } = req.body;

        const user = await User.findOne({ _id: id });

        if (!user) {

            return res.status(404).json({ error: 'User not found' });
        }

        if (password) {

            const salt = bcryptjs.genSaltSync();
            remain.password = bcryptjs.hashSync(password, salt);
        }

        await User.findByIdAndUpdate(id, remain);

        const updatedUser = await User.findOne({ _id: id });

        res.status(200).json({ msg: 'User has been updated', user: updatedUser });

    } catch (error) {

        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Error when updating user' });
    }
}

export const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, { status: false });

        res.status(200).json({ msg: 'User has been disable', user })
    } catch (error) {

        res.status(500).json({ error: 'Error when deleting user' });
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "Incorrect credentials, Email does not exist in the database",
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: "User is disabled at this moment",
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect",
            });
        }

        res.status(200).json({
            msg: 'Login Successfull, Welcome:',
            user
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact administrator",
        });
    }
};