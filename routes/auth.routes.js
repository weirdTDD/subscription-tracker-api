import { Router } from "express";

import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();


//Path: /api/v1/auth/sign-up
// This route handles user sign-up requests. It expects a POST request with user details in the request body.
authRouter.post("/sign-up", signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);



//Placeholder routes for forgot-password, reset-password, and verify-email (ready for future implementation).
authRouter.post('/forgot-password', (req, res) => res.send({title: "Forgot Password"})); 

authRouter.post('/reset-password', (req, res) => res.send({title: "Reset Password"}));

authRouter.post('/verify-email', (req, res) => res.send({title: "Verify Email"}));  

export default authRouter; 
