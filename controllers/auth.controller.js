import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import User from '../models/user.model.js';
import {JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        // Check if the user already exists
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        } 

        //Hash the password
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the generated salt


        

        //CREATE NEW USER
        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword, // Store the hashed password
        }], {session}); // Pass the session to the save operation to ensure it is part of the transaction

        //SAVE THE USER IN DB W/ TRANSANCTION

        const token = jwt.sign({ userId: newUsers[0]._id },  JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }); 
        // Generate a JWT token for the user

        await session.commitTransaction();
        session.endSession(); // End the session

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: newUsers[0], // Return the created user
                token, // Include the token in the response
            },
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};


export const signIn = async (req, res, next) => {
    try {
        const{email, password} = req.body;

        const user = await User.findOne({email}); 

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        //Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database

        if(!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }); // Generate a JWT token for the user
        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                user, // Return the user object
                token, // Include the token in the response
            },
        });
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res) => {}