import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library

import User from '../models/user.model.js'; // Import the User model
import { JWT_SECRET } from '../config/env.js'; // Import the JWT secret from the environment configuration
const authorize = async( req, res, next) => {
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // Get the token from the Authorization header
        }

        if(!token) {
            return res.status(401).json({message:'Unauthorized: No token provided'}); // If no token is provided, respond with unauthorized status
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET); // Verify the token using the secret key
        const user = await User.findById(decoded.userId); // Find the user by ID from the token

        if(!user) {
            return res.status(401).json({message:'Unauthorized: User not found'});
        }

        req.user = user; // Attach the user to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({message:'Unauthorized: Token expired'}); // If the token is expired, respond with unauthorized status
        }
        res.status(401).json({message:'Unauthorized', error: error.message});
    }
}


export default authorize; // Export the authorize middleware function
// This middleware function checks if the user is authenticated by verifying the JWT token. It extracts the token from the Authorization header, verifies it, and retrieves the user from the database. If the user is found, it attaches the user object to the request and calls the next middleware or route handler. If not, it responds with an unauthorized status.
// The JWT_SECRET is used to sign and verify the token, ensuring that only authorized users can access protected routes.