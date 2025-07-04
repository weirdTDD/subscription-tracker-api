import e from 'express';
import Subscription from '../models/subscription.model.js'


export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find().populate('user', 'name email');

        res.status(200).json({ success: true, data: subscriptions });
    }catch (e) {
        next(e);
    }
}


export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user._id.toString() !== req.params.id) {
            const error = new Error('You are not the owner of this subscription');
            error.status = 403;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.user._id });

        res.status(200).json({ success: true, data: subscriptions });
        }catch (e) {
        next(e);
    }
}



export const createSubscription = async(req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        res.status(201).json({success:true, data:subscription });
    } catch (e) {
        next(e);
    }
}



export const updateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById( req.params.id);
        //this will find the subscription by id and check if it exists

        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }else if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'You are not authorized to update this subscription'
                // This checks if the user trying to update the subscription is the owner
             });
        }

        //Update fields
        Object.assign(subscription, req.body);

        //Save to triger all validators
        await subscription.save();

        res.status(200).json({ success: true, data: subscription });
        }catch (e) {
        next(e);
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ success: false , Message: 'Subscription not found'});
        } else if (subscription.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'You are not authorized to delete this subscription' });
        }

        await subscription.deleteOne();

        res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
    } catch (e) {
        next(e);
    }
}

 // This function is a placeholder for canceling a subscription
export const cancelSubscription = async (req, res) => {
    res.status(200).json({ success: true, message: 'Subscription canceled successfully' });
}


// This function is a placeholder for getting upcoming renewals, it should ideally fetch subscriptions that are due for renewal soon
export const getUpcomingRenewals = async (req, res) => {
    res.status(200).json({ success: true, message: 'Upcoming renewals fetched successfully' });
}