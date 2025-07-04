import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: [3, 'Subscription name must be at least 3 characters long'],
        maxlength: [50, 'Subscription name must be at most 50 characters long'],
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Subscription price must be graeter than  0'],
    },
    currency: {
        type: String,
        required: [true, 'Subscription currency is required'],
        enum: ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CNY','GHS', 'KES', 'NGN', 'ZAR'],
        default: 'USD',
    },
    billingCycle: {
        type: String,
        required: [true, 'Subscription billing cycle is required'],
        enum: ['monthly', 'yearly'],
        default: 'monthly',
    },
    startDate: {
        type: Date,
        required: [true, 'Subscription start date is required'],
        default: Date.now,
        validate: {
            validator: (value) => value <= new Date(),
        message:'Start date must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function (value) {
                 return value > this.startDate;
            },
        message:'Renewal date must be after the start date'
        }
    },
    endDate: {
        type: Date,
        required: [true, 'Subscription end date is required'],
    },
    paymentMethod:{
        type:String,
        required: true,
        trim: true,
    },
    status:{
        type: String,
        enum:['active','cancelled','expired'],
        default: 'active'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

},{timestamps:true});


//Auto-calculate renewal date if missing.
subscriptionSchema.pre('save', function (next){
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthy: 30,
            yearly: 365,
        };

        //Jan 1st = startDate
        //if Monthly = 30days, 
        // Then renewal = Jan 31st

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    // Auto-update the status if renewal date has passed
    if ( this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();

})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;