const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    tags: {
        petsAllowed: {
            type: Boolean,
            default: false
        },
        noSmoking: {
            type: Boolean,
            default: true
        },
        expressRoute: {
            type: Boolean,
            default: false
        },
        acVehicle: {
            type: Boolean,
            default: true
        },
        ladiesOnly: {
            type: Boolean,
            default: false
        }
    },
    status: {
        type: String,
        enum: [ 'pending', 'accepted', "ongoing", 'completed', 'cancelled' ],
        default: 'pending',
    },
    duration: {
        type: Number,
    }, 
    distance: {
        type: Number,
    }, 
    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select: false,
        required: true,
    },
})

module.exports = mongoose.model('ride', rideSchema);