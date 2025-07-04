import User from '../models/user.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  

export const  getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({success: true, data:users });
    } catch (error) {
        next(error)
        
    }
};

export const  getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404
            throw error;
        }

        res.status(200).json({success: true, data:user });
    } catch (error) {
        next(error)
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate the input data
        if (!name || !email || !password) {
            const error = new Error('All fields are required');
            error.statusCode = 400;
            throw error;
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Create a new user 
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with the generated bcrypt salt
        // 10 is the salt rounds, you can adjust it for security vs performance trade-off
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, data: newUser });
    }catch (error) {
        next(error);
    }
}


export const updateUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        // Validate the input data
        if (!name || !email) {
            const error = new Error('Name and email are required');
            error.statusCode = 400;
            throw error;
        }

        // Find the user by ID and update
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email },
            { new: true, runValidators: true }
        );

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};

