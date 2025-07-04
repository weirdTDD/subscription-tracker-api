import { Router }  from "express";
import authorize from '../middleware/auth.middleware.js'
import {
  getAllSubscriptions,
  getUserSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription
} from '../controllers/subscription.controller.js';
// This code defines a set of routes for managing subscriptions in an Express application.
//it routes requests related to subscriptions, such as creating, updating, deleting, and retrieving subscription details.
import { get } from "http";


const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, getAllSubscriptions)

subscriptionRouter.get('/:id', authorize, getUserSubscriptions);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id',authorize, updateSubscription)

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: "CANCEL  subscriptions"}))

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: "GET upcoming  subscriptions"}))




export default subscriptionRouter;