import express from  'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import {PORT} from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import arcjetMiddleware from './middleware/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

dotenv.config();

const app = express();

//Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.get('/', (req, res) => {
    res.send( 'Welcome to the Subscription Tracker API' );
});

//Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);


//Error handling middleware
app.use((req, res, next) => {
    res.status(404).send({ error: 'Not Found' });
});


//port and server 
app.listen(PORT, async () => {
    console.log(`Subscription tracker API running on http://localhost:${PORT}`)

    await connectToDatabase();
});

export default app;