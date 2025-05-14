const mongoose = require('mongoose');

const locationPointSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    address: {
        type: String
    }
}, { _id: false });

const optimizedRouteSchema = new mongoose.Schema({
    rideRequestId: {
        type: String,
        required: true,
        unique: true
    },
    pickupPoints: [locationPointSchema],
    dropPoints: [locationPointSchema],
    optimizedRoute: [locationPointSchema],
    timeEstimateMinutes: {
        type: Number,
        required: true
    },
    trafficConsidered: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const optimizedRouteModel = mongoose.model('optimizedRoute', optimizedRouteSchema);

module.exports = optimizedRouteModel;